using Domino.Domain.Entities;
using Domino.Domain.Enums;
using MediatR;
using Microsoft.Extensions.Caching.Memory;

namespace Domino.Application.Commands.Games.StartGame;

public class StartGameCommandHandler : IRequestHandler<StartGameCommand, Game>
{
    private readonly IMemoryCache _cache;
    public StartGameCommandHandler(
        IMemoryCache cache)
    {
        _cache = cache;
    }
    public Task<Game> Handle(StartGameCommand command, CancellationToken cancellationToken)
    {
        long id = DateTime.UtcNow.Ticks;
        var game = new Game(id, command.Player, command.Opponent);
        if(game.GameStatus.GameType == GameType.Normal)
        {
            ServeStartHands(game);
        }
        else if(game.GameStatus.GameType == GameType.Hunt)
        {
            LeaveStarterToHunterAndServeHands(game);
        }
        game.IsOpponentTurn = !IsPlayerFirst(game);
        _cache.Set(command.Player.Name, game);
        return Task.FromResult(game);
    }
    private static void ServeStartHands(Game game, int tilesNumber = 7)
    {
        for (int i = 0; i < tilesNumber; i++)
        {
            game.Player.GrabTile(game.Set.ServeTile());
            game.Opponent.GrabTile(game.Set.ServeTile());
        }
        game.Player.GrabInRow = 0;
        game.Opponent.GrabInRow = 0;
    }
    private static void LeaveStarterToHunterAndServeHands(Game game)
    {
        var hunter = game.GameStatus.Hunters.Contains(game.Player.Name)
            ? game.Player
            : game.Opponent;
        var hunted = hunter.Name == game.Player.Name ? game.Opponent : game.Player;
        hunter.GrabTile(game.Set.LeaveStarterForHunter());
        hunted.GrabTile(game.Set.ServeTile());
        ServeStartHands(game, 6);
    }
    private static bool IsPlayerFirst(Game game)
    {
        if(game.GameStatus.GameType == GameType.Hunt)
        {
            return game.GameStatus.Hunters.Contains(game.Player.Name);
        }
        var starters = game.GameRules.StarterTiles;
        foreach(var starter in starters)
        {
            if(game.Player.Hand.Find(d => d.TileId == starter) != null)
            {
                return true;
            }
            else if(game.Opponent.Hand.Find(d => d.TileId == starter) != null)
            {
                return false;
            }
        }
        return true;
    }
}
