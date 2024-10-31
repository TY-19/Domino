using Domino.AITournament.Helpers;
using Domino.AITournament.Interfaces;
using Domino.AITournament.Models;
using Domino.Application.Commands.Games.MakeOpponentMove;
using Domino.Application.Commands.Games.SaveGame;
using Domino.Application.Commands.Players.UpdatePlayersStatistic;
using Domino.Application.Extensions;
using Domino.Application.Interfaces;
using Domino.Application.Models;
using Domino.Application.Strategies;
using Domino.Domain.Entities;
using Domino.Domain.Enums;
using MediatR;

namespace Domino.AITournament.Services;

public class TournamentService
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
    private readonly IEngineRepository _engineRepository;
    private readonly IPlayerRepository _playerRepository;
    private readonly IGameRepository _gameRepository;
    private readonly IMediator _mediator;
    private readonly IStrategyFactory _strategyFactory;
    public TournamentService(
        IEngineRepository engineRepository,
        IPlayerRepository playerRepository,
        IGameRepository gameRepository,
        IMediator mediator,
        IStrategyFactory strategyFactory
        )
    {
        _engineRepository = engineRepository;
        _playerRepository = playerRepository;
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
        var samples = new NLHSampler(256).GenerateSamples()
            .Select((s, i) => new Engine($"{id}_{i}", s))
            .ToList();
        await _engineRepository.SaveEnginesAsync(samples);
    }
    public async Task<List<Engine>> CreateTournamentAsync()
    {
        long id = DateTime.UtcNow.Ticks;
        var samples = new NLHSampler(256).GenerateSamples()
            .Select((s, i) => new Engine($"{id}_{i}", s))
            .ToList();
        await _engineRepository.SaveEnginesAsync(samples);
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
        await _engineRepository.SaveEnginesAsync(samples);
        return await PlayStage(starters, 20);
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
    public async Task<List<Engine>> TestPlayMatch()
    {
        var engines = new NLHSampler(2).GenerateSamples()
                .Select((s, i) => new Engine($"Engine_{i}", s))
                .ToList();
        for(int i = 0; i < 100; i++)
        {
            await PlayMatchAsync(engines[0], engines[1]);
        }
        return [ engines[0], engines[1] ];
    }
    public async Task<IEnumerable<Engine>> PlayDefaultAITournamentAsync(int numberGames)
    {
        string[] names = [ "AI", "Alice", "Bob", "Charley", "Daniel", "Emma", "Frank", 
            "George", "Hugh", "Inga", "John", "Kathy", "Lucy", "Monica", "Nathan",
            "Owen", "Paul", "Richard", "Sam", "Terry", "Victor", "Walter"];
        int defCount = new DefaultCoefficients().Coefficients.Count + 1;
        Dictionary<string, Engine?> engines = new();
        for(int i = 0; i < defCount - 1; i++)
        {
            for(int j = i + 1; j < defCount; j++)
            {
                var res = await PlayMatchAsync(numberGames, names[i], names[j]);
                if(j == defCount - 1)
                {
                    engines[names[i]] = res.FirstOrDefault();
                    if(i == defCount - 2)
                    {
                        engines[names[j]] = res.LastOrDefault();
                    }
                }
            }
            Console.WriteLine("Finish " + names[i]);
        }
        return engines.Where(e => e.Value != null).Select(e => e.Value!).ToList();
    }
    public async Task<IEnumerable<Engine>> PlayMatchAsync(int numberGames, string oneName, string twoName = "AI")
    {
        Engine? one = await _engineRepository.GetEngineAsync(oneName);
        if(one == null)
        {
            var coeffs = (await _playerRepository.GetPlayerInfoAsync(oneName))?.Coefficients;
            if(coeffs == null)
            {
                coeffs = new StrategyCoefficients();
                Console.WriteLine("New default engine");
            }
            one = new Engine(oneName, coeffs);
        }
        Engine? two = await _engineRepository.GetEngineAsync(twoName);
        if(two == null)
        {
            var coeffs = (await _playerRepository.GetPlayerInfoAsync(twoName))?.Coefficients;
            if(coeffs == null)
            {
                coeffs = new StrategyCoefficients();
                Console.WriteLine("New default engine");
            }
            two = new Engine(twoName, coeffs);
        }
        for(int i = 0; i < numberGames; i++)
        {
            await PlayMatchAsync(one, two);
        }
        await _engineRepository.CreateEngineAsync(one);
        await _engineRepository.CreateEngineAsync(two);
        return [one, two];
    }
    public async Task<GameView?> PlayMatchAsync(Engine one, Engine two)
    {
        long id = DateTime.UtcNow.Ticks;
        var playerInfo = await _playerRepository.GetPlayerInfoAsync(one.Player.Name) ?? one.Player.Info;
        var opponentInfo = await _playerRepository.GetPlayerInfoAsync(two.Player.Name) ?? two.Player.Info;
        var game = new Game(id, new Player(playerInfo), new Player(opponentInfo), DefaultRules);
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
            }
            isEnded = game.GameResult?.IsEnded ?? false;
        }
        if(isEnded)
        {
            var oneStat = await _playerRepository.GetPlayerStatisticsAsync(one.Player.Name);
            if(oneStat != null)
            {
                one.Statistic = oneStat;
            }
            var twoStat = await _playerRepository.GetPlayerStatisticsAsync(two.Player.Name);
            if(twoStat != null)
            {
                two.Statistic = twoStat;
            }
        }
        else
        {
            Console.WriteLine("Game has not ended " + game.Id);
            await _mediator.Send(new SaveGameCommand() { Game = game });
        }
        return game.ToGameView(one.Player.Name);
    }
    private static int CompareEngineScores(Engine one, Engine two)
    {
        double points1 = one.Statistic.GeneralWins * 3 + one.Statistic.OfficerWins * 2 + one.Statistic.GoatWins
            + one.Statistic.NormalVictoryWins * 0.1 + one.Statistic.ClearedPoints * 0.1 + one.Statistic.Draws * 0.05
            - one.Statistic.GeneralLoses * 3 - one.Statistic.OfficerLoses * 2 - one.Statistic.GoatLoses
            - one.Statistic.NormalVictoryLoses * 0.1;
        double points2 = two.Statistic.GeneralWins * 3 + two.Statistic.OfficerWins * 2 + two.Statistic.GoatWins
            + two.Statistic.NormalVictoryWins * 0.1 + two.Statistic.ClearedPoints * 0.1 + two.Statistic.Draws * 0.05
            - two.Statistic.GeneralLoses * 3 - two.Statistic.OfficerLoses * 2 - two.Statistic.GoatLoses
            - two.Statistic.NormalVictoryLoses * 0.1;
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

        HashSet<string> ids = new();
        foreach(var x in game.Opponent.Hand)
        {
            if(!ids.Add(x.TileId))
            {
                Console.WriteLine("Mistake");
            }
        }
        foreach(var x in game.Player.Hand)
        {
            if(!ids.Add(x.TileId))
            {
                Console.WriteLine("Mistake");
            }
        }
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
        HashSet<string> ids = new();
        foreach(var x in game.Opponent.Hand)
        {
            if(!ids.Add(x.TileId))
            {
                Console.WriteLine("Mistake");
            }
        }
        foreach(var x in game.Player.Hand)
        {
            if(!ids.Add(x.TileId))
            {
                Console.WriteLine("Mistake");
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
