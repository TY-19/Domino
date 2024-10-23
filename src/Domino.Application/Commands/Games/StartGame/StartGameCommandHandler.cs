using Domino.Application.Interfaces;
using Domino.Domain.Entities;
using Domino.Domain.Enums;
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
        SetGameType(game);
        if(game.GameStatus.GameType == GameType.Normal)
        {
            ServeStartHands(game);
        }
        else if(game.GameStatus.GameType == GameType.Hunt)
        {
            LeaveStarterToHunterAndServeHands(game);
        }
        game.IsOpponentTurn = !IsPlayerFirst(game);
        _cache.Set(player.PlayerName, game);
        return game;
    }
    private static void SetGameType(Game game)
    {
        game.GameStatus.GameType = GameType.Normal;
        if(game.Player.Info.CurrentPointCount >= game.GameRules.PointsToStartHunt)
        {
            game.GameStatus.GameType = GameType.Hunt;
            game.GameStatus.Hunted.Add(game.Player.Name);
            game.GameStatus.Hunters.Add(game.Opponent.Name);
        }
        if(game.Opponent.Info.CurrentPointCount >= game.GameRules.PointsToStartHunt)
        {
            game.GameStatus.GameType = GameType.Hunt;
            game.GameStatus.Hunted.Add(game.Opponent.Name);
            game.GameStatus.Hunters.Add(game.Player.Name);
        }
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
