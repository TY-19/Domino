using Domino.AITournament.Helpers;
using Domino.AITournament.Interfaces;
using Domino.AITournament.Models;
using Domino.Application.Commands.Games.MakeOpponentMove;
using Domino.Application.Commands.Games.SaveGame;
using Domino.Application.Commands.Players.UpdatePlayersStatistic;
using Domino.Application.Extensions;
using Domino.Application.Interfaces;
using Domino.Application.Models;
using Domino.Domain.Entities;
using Domino.Domain.Enums;
using MediatR;

namespace Domino.AITournament.Services;

public class TournamentService
{
    private readonly IEngineRepository _engineRepository;
    private readonly IGameRepository _gameRepository;
    private readonly IMediator _mediator;
    private readonly IStrategyFactory _strategyFactory;
    public TournamentService(
        IEngineRepository engineRepository,
        IGameRepository gameRepository,
        IMediator mediator,
        IStrategyFactory strategyFactory
        )
    {
        _engineRepository = engineRepository;
        _gameRepository = gameRepository;
        _mediator = mediator;
        _strategyFactory = strategyFactory;
    }
    public async Task<Game?> GetGameByIdAsync(long id)
    {
        return await _gameRepository.GetGameAsync(id);
    }
    public async Task<List<Engine>> GetEnginesAsync()
    {
        return await _engineRepository.GetAllEnginesAsync();
    }
    public async Task<Engine?> GetEngineAsync(string name)
    {
        return await _engineRepository.GetEngineAsync(name);
    }
    public async Task CreateEnginesAsync()
    {
        long id = DateTime.UtcNow.Ticks;
        var samples = new NLHSampler(1024).GenerateSamples()
                .Select((s, i) => new Engine($"{id}_{i}", s))
                .ToList();
        await _engineRepository.CreateEnginesAsync(samples);
    }
    public async Task<List<Engine>> CreateTournamentAsync()
    {
        List<Engine> samples = (await _engineRepository.GetAllEnginesAsync()).ToList();
        List<Engine> starters = [];
        starters.AddRange(samples);
        if(starters.Count < 128)
        {
            Console.WriteLine("Creating engines");
            await CreateEnginesAsync();
            return [];
        }
        while(starters.Count > 100)
        {
            List<Engine> winners = [];
            for(int i = 1; i <= 8; i++)
            {
                Console.WriteLine($"Round of {starters}: {i}");
                var startInd = 128 * (i - 1);
                if(starters.Count < startInd + 127)
                {
                    Console.WriteLine("break 63");
                    break;
                }
                winners.AddRange(await PlayStage(starters.GetRange(startInd, 128)));
            }
            starters = [];
            starters.AddRange(winners);
        }
        return await PlayStage(starters, 50);
    }
    private async Task<List<Engine>> PlayStage(List<Engine> engines, int rounds = 10)
    {
        for (int round = 1; round <= rounds; round++)
        {
            engines.Sort((e1, e2) => CompareEngineScores(e2, e1));
            for (int i = 0; i < engines.Count; i += 2)
            {
                if (i + 1 < engines.Count)
                {
                    await PlayMatchAsync(engines[i], engines[i + 1]);
                }
            }
        }
        engines.Sort((e1, e2) => CompareEngineScores(e2, e1));
        return engines.GetRange(0, engines.Count / 2);
    }
    public async Task<GameView?> PlayMatchAsync(Engine one, Engine two)
    {
        // var time = DateTimeOffset.UtcNow;
        
        // repository to create player
        long id = DateTime.UtcNow.Ticks;
        var game = new Game(id, one.Player, two.Player);
        if(game.GameStatus.GameType == GameType.Hunt)
        {
            LeaveStarterToHunterAndServeHands(game);
        }
        else
        {
            ServeStartHands(game);
        }
        game.IsOpponentTurn = !IsPlayerFirst(game);
        
        bool isEnded = false;
        int i = 0;
        while(!isEnded && i < 50)
        {
            i++;
            var activePlayer = game.IsOpponentTurn ? game.Opponent : game.Player;
            if(game.IsOpponentTurn)
            {
                game.TrySetResult();
                if(game.GameResult?.IsEnded == true)
                {
                    game.IsOpponentTurn = false;
                    await _mediator.Send(new UpdatePlayersStatisticCommand() { Game = game });
                    // await _mediator.Send(new SaveGameCommand() { Game = game });
                    isEnded = true;
                    continue;
                }
                if(!game.IsOpponentTurn)
                {
                    continue;
                }
                int j = 0;
                while(game.IsOpponentTurn && j < 10)
                {
                    j++;
                    var strategy = _strategyFactory.SelectStrategy(activePlayer);
                    var move = strategy.SelectMove(game.ToGameView(activePlayer.Name));
                    game = await _mediator.Send(new MakeOpponentMoveCommand() { Game = game, Move = move });
                }
                // game.TrySetResult();
                // if(game.GameResult?.IsEnded == true)
                // {
                //     await _mediator.Send(new UpdatePlayersStatisticCommand() { Game = game });
                //     // await _mediator.Send(new SaveGameCommand() { Game = game });
                // }
            }
            else
            {
                game.TrySetResult();
                if(game.GameResult?.IsEnded == true)
                {
                    game.IsOpponentTurn = false;
                    await _mediator.Send(new UpdatePlayersStatisticCommand() { Game = game });
                    // await _mediator.Send(new SaveGameCommand() { Game = game });
                    isEnded = true;
                    continue;
                }
                int j = 0;
                while(!game.IsOpponentTurn && j < 10)
                {
                    j++;
                    var strategy = _strategyFactory.SelectStrategy(activePlayer);
                    var move = strategy.SelectMove(game.ToGameView(activePlayer.Name));
                    game = await _mediator.Send(new MakeOpponentMoveCommand() { Game = game, Move = move });
                }
                // game.TrySetResult();
                // if(game.GameResult?.IsEnded == true)
                // {
                //     await _mediator.Send(new UpdatePlayersStatisticCommand() { Game = game });
                //     // await _mediator.Send(new SaveGameCommand() { Game = game });
                // }
            }
            isEnded = game.GameResult?.IsEnded ?? false;
        }
        if(!isEnded)
        {
            Console.WriteLine("Game has not ended " + game.Id);
            await _mediator.Send(new SaveGameCommand() { Game = game });
        }
        // var timeEnd = DateTimeOffset.UtcNow;
        // TimeSpan timeSpan = timeEnd - time;
        // Console.WriteLine("Game has took " + timeSpan.TotalSeconds + " seconds");
        return game.ToGameView(one.Player.Name);
    }
    private static int CompareEngineScores(Engine one, Engine two)
    {
        int points1 = one.Statistic.GeneralWins * 3 + one.Statistic.OfficerWins * 2 + one.Statistic.GoatWins;
        int points2 = two.Statistic.GeneralWins * 3 + two.Statistic.OfficerWins * 2 + two.Statistic.GoatWins;
        return points1.CompareTo(points2);
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
