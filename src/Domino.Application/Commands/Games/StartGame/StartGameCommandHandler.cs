using Domino.Application.Interfaces;
using Domino.Domain.Entities;
using MediatR;
using Microsoft.Extensions.Caching.Memory;

namespace Domino.Application.Commands.Games.StartGame;

public class StartGameCommandHandler : IRequestHandler<StartGameCommand, Game>
{
    private readonly IPlayerRepository _playerRepository;
    private readonly IMemoryCache _cache;
    public StartGameCommandHandler(
        IPlayerRepository playerRepository,
        IMemoryCache cache)
    {
        _playerRepository = playerRepository;
        _cache = cache;
    }
    public async Task<Game> Handle(StartGameCommand command, CancellationToken cancellationToken)
    {
        long id = DateTime.UtcNow.Ticks;
        PlayerInfo player = await _playerRepository.GetPlayerInfoAsync(command.PlayerName);
        PlayerInfo opponent = await _playerRepository.GetPlayerInfoAsync(command.OpponentName);
        var game = new Game(id, player, opponent);
        ServeStartHands(game);
        game.IsOpponentTurn = !IsPlayerFirst(game);
        _cache.Set(player.PlayerName, game);
        return game;
    }
    private static void ServeStartHands(Game game)
    {
        for (int i = 0; i < 7; i++)
        {
            game.Player.GrabTile(game.Set.ServeTile());
            game.Opponent.GrabTile(game.Set.ServeTile());
        }
    }
    private static bool IsPlayerFirst(Game game)
    {
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
