using Domino.AITournament.Interfaces;
using Domino.AITournament.Models;
using Domino.Application.Commands.Games.MakeOpponentMove;
using Domino.Application.Commands.Games.SaveGame;
using Domino.Application.Extensions;
using Domino.Application.Interfaces;
using Domino.Application.Models;
using Domino.Domain.Entities;
using Domino.Domain.Enums;
using MediatR;

namespace Domino.AITournament.Services;

public class AiGameService(
    IEngineService engineService,
    IMediator mediator,
    IStrategyFactory strategyFactory
    ) : IAiGameService
{
    private static readonly GameRules DefaultRules = new() 
    {
        MaxGrabsInRow = 3,
        MinLeftInMarket = 1,
        PointsToStartHunt = 25,
        WorkGoat = true,
        TotalPointsToLoseWithGoat = 125,
        StarterTiles = ["1-1", "2-2", "3-3", "4-4", "5-5", "6-6"],
        HuntStarterTiles = ["6-6"],
        LastTilePoints = new()
        {
            { "0-0", 25 },
            { "6-6", 100 }
        }
    };
    private readonly IEngineService _engineService = engineService;
    private readonly IMediator _mediator = mediator;
    private readonly IStrategyFactory _strategyFactory = strategyFactory;

    public async Task<GameView?> PlayGameAsync(Engine one, Engine two)
    {
        long id = DateTime.UtcNow.Ticks;
        var game = new Game(id, one.Player, two.Player, DefaultRules);
        Begin(game);
        bool isEnded = false;
        int i = 0;
        while(!isEnded && i < 50)
        {
            i++;
            var activePlayer = game.IsOpponentTurn ? game.Opponent : game.Player;
            game.TrySetResult();
            if(game.GameResult?.IsEnded == true)
            {
                _engineService.UpdatePlayersStatistic(game, one, two);
                isEnded = true;
                continue;
            }
            bool isOpponentTurn = game.IsOpponentTurn;
            int j = 0;
            while(game.IsOpponentTurn == isOpponentTurn && j < 10)
            {
                j++;
                var strategy = _strategyFactory.SelectStrategy(activePlayer);
                var move = strategy.SelectMove(game.ToGameView(activePlayer.Name));
                game = await _mediator.Send(new MakeOpponentMoveCommand() { Game = game, Move = move });
            }
            isEnded = game.GameResult?.IsEnded ?? false;
        }
        return game.ToGameView(one.Player.Name);
    }
    private static void Begin(Game game)
    {
        if(game.GameStatus.GameType == GameType.Hunt)
        {
            LeaveStarterToHunterAndServeHands(game);
        }
        else
        {
            ServeStartHands(game);
        }
        game.IsOpponentTurn = !IsPlayerFirst(game);
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
        EnsureValidServing(game);
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
        EnsureValidServing(game);
    }
    private static void EnsureValidServing(Game game)
    {
        HashSet<string> ids = [];
        foreach(var x in game.Opponent.Hand)
        {
            if(!ids.Add(x.TileId))
            {
                throw new Exception($"Invalid tile {x.TileId} has been served to the opponent.");
            }
        }
        foreach(var x in game.Player.Hand)
        {
            if(!ids.Add(x.TileId))
            {
                throw new Exception($"Invalid tile {x.TileId} has been served to the player.");
            }
        }
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
