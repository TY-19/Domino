using Domino.Application.Extensions;
using Domino.Application.Interfaces;
using Domino.Domain.Entities;
using Domino.Domain.Enums;
using Microsoft.Extensions.Caching.Memory;

namespace Domino.Application.Services;

public class GameService : IGameService
{
    private Game? _game;
    private readonly IMemoryCache _cache;
    private ICurrentUserService _currentUserService;
    private IAiPlayerService? _aiPlayerService;
    public GameService(
        IMemoryCache memoryCache,
        ICurrentUserService currentUserService)
    {
        _currentUserService = currentUserService;
        _cache = memoryCache;
        long? gameId = _currentUserService.GetCurrentGameId();
        if(gameId != null &&
            _cache.TryGetValue(gameId, out Game? game) && game != null)
        {
            _game = game;
            _aiPlayerService = new AiPlayerService(_game.Opponent);
        }
    }
    
    public Game StartGame(string playerName, string opponentName)
    {
        long id = DateTime.UtcNow.Ticks;
        _game = new Game(id, playerName, opponentName);
        _aiPlayerService = new AiPlayerService(_game.Opponent);
        ServeStartHands();
        _cache.Set(id, _game);
        _currentUserService.SetCurrentGameId(id);
        return _game;
    }
    public List<TileDetails> GetHand()
    {
        return GetGame().Player.Hand;
    }
    
    public LinkedList<DominoTile> GetTable()
    {
        return GetGame().Table.TilesOnTable;
    }
    public Game PlayTile(string tileId, int contactEdge, bool? isLeft)
    {
        var game = GetGame();
        var tileDetails = game.Player.GetTileFromHand(tileId)
            ?? throw new ArgumentException("No tile with such an id in the hand");
        game.Player.PlayTile(tileDetails);
        var tile = game.Table.PlaceTile(tileDetails, contactEdge, isLeft);
        game.Log.AddEntry(new GameLogEntry()
        {
            PlayerName = game.Player.Name,
            Type = MoveType.PlayTile,
            Tile = tile,
        });
        WaitOpponentTurn();
        return game;
    }
    public Game GrabTile()
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
        return game;
    }
    public Game WaitOpponentTurn()
    {
        var game = GetGame();
        return WaitOpponentTurn(game);
    }
    public Game WaitOpponentTurn(Game game)
    {
        var move = _aiPlayerService?.MakeMove(game.ToGameView(game.Opponent.Name));
        switch (move)
        {
            case PlayTileMove ptm:
                game.Opponent.PlayTile(ptm.Tile);
                var tile = game.Table.PlaceTile(ptm.Tile, ptm.ContactEdge, null);
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
        return _game ?? StartGame("Player", "AI");
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
}