using Domino.Application.Interfaces;
using Domino.Domain.Entities;
using Microsoft.Extensions.Caching.Memory;

namespace Domino.Application.Services;

public class GameService : IGameService
{
    private Game? _game;
    private readonly IMemoryCache _cache;
    private ICurrentUserService _currentUserService;
    public GameService(IMemoryCache memoryCache, ICurrentUserService currentUserService)
    {
        _currentUserService = currentUserService;
        _cache = memoryCache;
        long? gameId = _currentUserService.GetCurrentGameId();
        if(gameId != null &&
            _cache.TryGetValue(gameId, out Game? game) && game != null)
        {
            _game = game;
        }
    }
    
    public Game StartGame(string playerName, string opponentName)
    {
        long id = DateTime.UtcNow.Ticks;
        _game = new Game(id, playerName, opponentName);
        ServeStartHands();
        _cache.Set(id, _game);
        _currentUserService.SetCurrentGameId(id);
        return _game;
    }
    public List<DominoTile> GetHand()
    {
        return GetGame().Player.Hand;
    }
    
    public LinkedList<DominoTile> GetTable()
    {
        return GetGame().Table.TilesOnTable;
    }
    public Game PlayTile(string tileId, string? nextTo)
    {
        var game = GetGame();
        var tile = game.Player.GetTileFromHand(tileId)
            ?? throw new ArgumentException("Wrong tile id");
        DominoTile? nextToTile = null;
        if(nextTo != null)
        {
            if(game.Table.TilesOnTable.First?.Value?.TileId == nextTo)
            {
                nextToTile = game.Table.TilesOnTable.First?.Value;
            }
            else if(game.Table.TilesOnTable.Last?.Value?.TileId == nextTo)
            {
                nextToTile = game.Table.TilesOnTable.Last?.Value;
            }
        }
        if (tile != null && game.Table.CanBePlayed(tile))
        {
            game.Player.PlayTile(tile);
            game.Table.PlaceTile(tile, nextToTile);
            game.Log.AddEntry(new GameLogEntry()
            {
                MoveNumber = GetCurrentMoveNumber(game),
                PlayerName = game.Player.Name,
                Type = Domain.Enums.MoveType.PlayTile,
                Tile = tile,
                NextToTile = nextToTile
            });
        }
        return game;
    }
    public Game GrabTile()
    {
        var game = GetGame();
        if(game.Log.CanGrabAnotherTile(game.Player.Name))
        {
            var tile = game.Set.ServeTile();
            game.Player.GrabTile(tile);
            game.Log.AddEntry(new GameLogEntry()
            {
                MoveNumber = GetCurrentMoveNumber(game),
                PlayerName = game.Player.Name,
                Type = Domain.Enums.MoveType.GrabTile
            });
        }
        return game;
    }
    public Game WaitOpponentTurn()
    {
        var game = GetGame();
        var move = (game.Opponent as AiPlayer)?.MakeMove(game.Table);
        switch (move)
        {
            case PlayTileMove ptm:
                game.Opponent.PlayTile(ptm.Tile);
                game.Table.PlaceTile(ptm.Tile);
                game.Log.AddEntry(new GameLogEntry()
                {
                    MoveNumber = GetCurrentMoveNumber(game),
                    PlayerName = game.Opponent.Name,
                    Type = Domain.Enums.MoveType.PlayTile,
                    Tile = ptm.Tile,
                    NextToTile = ptm.NextTo
                });
                break;
            case GrabTileMove:
                if(game.Log.CanGrabAnotherTile(game.Opponent.Name))
                {
                    var tile = game.Set.ServeTile();
                    game.Opponent.GrabTile(tile);
                    game.Log.AddEntry(new GameLogEntry()
                    {
                        MoveNumber = GetCurrentMoveNumber(game),
                        PlayerName = game.Opponent.Name,
                        Type = Domain.Enums.MoveType.GrabTile
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

    private static int GetCurrentMoveNumber(Game game)
    {
        return game.Log.Events.DefaultIfEmpty().MaxBy(e => e?.MoveNumber)?.MoveNumber + 1 ?? 1;
    }
}