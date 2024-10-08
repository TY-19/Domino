using Domino.Application.Extensions;
using Domino.Application.Interfaces;
using Domino.Application.Models;
using Domino.Domain.Entities;
using Domino.Domain.Enums;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;

namespace Domino.Application.Services;

public class GameService : IGameService
{
    private Game? _game;
    private readonly IMemoryCache _cache;
    private ICurrentUserService _currentUserService;
    private IAiPlayerService? _aiPlayerService;
    private ILogger<GameService> _logger;
    public GameService(
        IMemoryCache memoryCache,
        ICurrentUserService currentUserService,
        ILogger<GameService> logger)
    {
        _currentUserService = currentUserService;
        _cache = memoryCache;
        _logger = logger;
        long? gameId = _currentUserService.GetCurrentGameId();
        if(gameId != null &&
            _cache.TryGetValue(gameId, out Game? game) && game != null)
        {
            _game = game;
            _aiPlayerService = new AiPlayerService(_game.Opponent);
        }
    }
    public GameView StartGame(string playerName, string opponentName)
    {
        var game = StartGameInner(playerName, opponentName);
        return game.ToGameView(game.Player.Name);
    }
    private Game StartGameInner(string playerName, string opponentName)
    {
        long id = DateTime.UtcNow.Ticks;
        _game = new Game(id, playerName, opponentName);
        _aiPlayerService = new AiPlayerService(_game.Opponent);
        ServeStartHands();
        _cache.Set(id, _game);
        _currentUserService.SetCurrentGameId(id);
        return _game;
    }
    public GameView PlayTile(string tileId, bool? isLeft)
    {
        _logger.LogInformation("PlayTile {tileId} to edge, left: {isLeft}", tileId, isLeft);
        var game = GetGame();
        _logger.LogInformation("Current game: {@game}", game);
        var tileDetails = game.Player.GetTileFromHand(tileId)
            ?? throw new ArgumentException("No tile with such an id in the hand.");
        int position = game.Table.TryGetPosition(tileDetails, isLeft)
            ?? throw new ArgumentException("The tile can't be played on the table.");
        _logger.LogInformation("Player plays {@details}", tileDetails);
        game.Player.PlayTile(tileDetails);
        _logger.LogInformation("Tile is placing on the table.");
        var tile = game.Table.PlaceTile(tileDetails, position);
        _logger.LogInformation("Writing log");
        game.Log.AddEntry(new GameLogEntry()
        {
            PlayerName = game.Player.Name,
            Type = MoveType.PlayTile,
            Tile = tile,
        });
        _logger.LogInformation("Waiting for opponent");
        _logger.LogInformation("Check for endgame conditions for player");
        TrySetGameResult(game);
        WaitOpponentTurn(game);
        _logger.LogInformation("Check for endgame conditions for opponent");
        TrySetGameResult(game);
        _logger.LogInformation("Returning result");
        return game.ToGameView(game.Player.Name);
    }
    public GameView GrabTile()
    {
        var game = GetGame();
        if(CanGrabAnotherTile(game.Player.Name))
        {
            var tile = game.Set.ServeTile();
            game.Player.GrabTile(tile);
            game.Log.AddEntry(new GameLogEntry()
            {
                PlayerName = game.Player.Name,
                Type = MoveType.GrabTile
            });
        }
        return game.ToGameView(game.Player.Name);
    }
    public GameView WaitOpponentTurn()
    {
        var game = GetGame();
        return WaitOpponentTurn(game).ToGameView(game.Player.Name);
    }
    public Game WaitOpponentTurn(Game game)
    {
        if(game.GameStatus.IsEnded)
        {
            return game;
        }
        var move = _aiPlayerService?.MakeMove(game.ToGameView(game.Opponent.Name));
        switch (move)
        {
            case PlayTileMove ptm:
                bool isLeft = ptm.ContactEdge == game.Table.LeftFreeEnd;
                int position = game.Table.TryGetPosition(ptm.Tile, isLeft)
                    ?? throw new ArgumentException("The tile can't be played on the table.");
                game.Opponent.PlayTile(ptm.Tile);
                var tile = game.Table.PlaceTile(ptm.Tile, position);
                game.Log.AddEntry(new GameLogEntry()
                {
                    PlayerName = game.Opponent.Name,
                    Type = MoveType.PlayTile,
                    Tile = tile
                });
                break;
            case GrabTileMove:
                if(CanGrabAnotherTile(game.Opponent.Name))
                {
                    var tileDetails = game.Set.ServeTile();
                    game.Opponent.GrabTile(tileDetails);
                    game.Log.AddEntry(new GameLogEntry()
                    {
                        PlayerName = game.Opponent.Name,
                        Type = MoveType.GrabTile
                    });
                    WaitOpponentTurn();
                }
                break;
            default:
                break;
        }
        return game;
    }
    private void ServeStartHands()
    {
        for (int i = 0; i < 7; i++)
        {
            GetGame().Player.GrabTile(GetGame().Set.ServeTile());
            GetGame().Opponent.GrabTile(GetGame().Set.ServeTile());
        }
    }

    private Game GetGame()
    {
        var game = _game ?? StartGameInner("Player", "AI");
        ThrowIfGameEnded(game);
        return game;
    }
    public bool CanGrabAnotherTile(string playerName)
    {
        var game = GetGame();
        if(game.Set.TilesCount <= game.GameRules.MinLeftInMarket)
        {
            return false;
        }
        var log = game.Log;
        if(log.Events.Count == 0)
        {
            return true;
        }
        var previous = log.Events.DefaultIfEmpty().MaxBy(e => e?.MoveNumber);
        if(previous?.PlayerName != playerName)
        {
            return true;
        }
        int grabbed = 1;
        for(int i = previous.MoveNumber - 1; i >= 0; i--)
        {
            var logEvent = log.Events.Find(e => e.MoveNumber == i);
            if(logEvent?.PlayerName != playerName || logEvent.Type != MoveType.GrabTile)
            {
                return true;
            }
            else
            {
                grabbed++;
                if(grabbed >= game.GameRules.MaxGrabsInRow)
                {
                    return false;
                }
            }
        }
        return true;
    }
    private void TrySetGameResult(Game game)
    {
        _logger.LogInformation("Try set game result for game:\n{@game}", game);
        if(game.Player.Hand.Count == 0)
        {
            _logger.LogInformation("game.Player.Hand.Count == 0");
            SetGameStatus(game, game.Player.Name);
        }
        else if (game.Opponent.Hand.Count == 0)
        {
            _logger.LogInformation("game.Opponent.Hand.Count == 0");
            SetGameStatus(game, game.Opponent.Name);
        }
        else if(game.Set.TilesCount <= game.GameRules.MinLeftInMarket
            && game.Table.GetPossibleMoves(game.Player.Hand).Count == 0
            && game.Table.GetPossibleMoves(game.Opponent.Hand).Count == 0)
        {
            _logger.LogInformation("Player possible moves:\n{@moves}", game.Table.GetPossibleMoves(game.Player.Hand));
            _logger.LogInformation("Opponent possible moves:\n{@moves}", game.Table.GetPossibleMoves(game.Opponent.Hand));
            game.GameStatus.IsEnded = true;
            game.GameStatus.LoserPointsCount[0] = (game.Player.Name, CountPoints(game.Player.Hand));
            game.GameStatus.LoserPointsCount[1] = (game.Opponent.Name, CountPoints(game.Opponent.Hand));
            game.GameStatus.Result = "The game ended up in a draw.\nPoints count is:\n"
                + $"{game.Player.Name} - {game.GameStatus.LoserPointsCount[0].Item2}\n"
                + $"{game.Opponent.Name} - {game.GameStatus.LoserPointsCount[1].Item2}";
        }
    }
    private static void SetGameStatus(Game game, string playerName)
    {
        game.GameStatus.IsEnded = true;
        if(playerName == game.Player.Name)
        {
            game.GameStatus.Winner = game.Player.Name;
            game.GameStatus.Loser = game.Opponent.Name;
        }
        else
        {
            game.GameStatus.Winner = game.Opponent.Name;
            game.GameStatus.Loser = game.Player.Name;
        }
        game.GameStatus.Result = $"{game.GameStatus.Winner} win!";
        var lastTile = game.Log.Events
            .Where(e => e.PlayerName == playerName)
            .MaxBy(e => e.MoveNumber);
        
        if(game.GameStatus.HuntPlayers.Contains(game.GameStatus.Loser))
        {
            if(lastTile?.Tile?.TileDetails.TileId == "0-0")
            {
                game.GameStatus.VictoryType = "General";
            }
            else
            {
                game.GameStatus.VictoryType = "Goat";
            }
        }
        else if(lastTile?.Tile?.TileDetails.TileId == "0-0")
        {
            game.GameStatus.VictoryType = "Officer";
        }
        else if(game.GameStatus.HuntPlayers.Contains(game.GameStatus.Winner))
        {
            game.GameStatus.VictoryType = "Cleared points";
        }
        else
        {
            game.GameStatus.VictoryType = "Normal Victory";
            var loserHand = game.GameStatus.Loser == game.Player.Name
                ? game.Player.Hand
                : game.Opponent.Hand;
            game.GameStatus.LoserPointsCount[0] = (game.GameStatus.Loser, CountPoints(loserHand));
            game.GameStatus.Result ??= "";
            game.GameStatus.Result += $"\n{game.GameStatus.Loser} is left with {game.GameStatus.LoserPointsCount[0].Item2} points.";
        }
    }
    private static int CountPoints(List<TileDetails> tileDetails)
    {
        int count = 0;
        foreach(var tileDetail in tileDetails)
        {
            count += tileDetail.SideA + tileDetail.SideB;
        }
        return count;
    }

    private static void ThrowIfGameEnded(Game game)
    {
        if(game.GameStatus.IsEnded)
        {
            throw new ArgumentException("Game is ended.");
        }
    }
}