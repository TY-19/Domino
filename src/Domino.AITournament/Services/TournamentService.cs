using System.Numerics;
using Domino.AITournament.Helpers;
using Domino.AITournament.Interfaces;
using Domino.AITournament.Models;

namespace Domino.AITournament.Services;

public class TournamentService(
    IEngineRepository engineRepository,
    AIGameService aIGameService
    )
{
    private readonly IEngineRepository _engineRepository = engineRepository;
    private readonly AIGameService _aiGameService = aIGameService;
    public async Task<List<Engine>> GetEnginesAsync()
    {
        return await _engineRepository.GetAllEnginesAsync();
    }
    public async Task<Engine?> GetEngineAsync(string name)
    {
        return await _engineRepository.GetEngineAsync(name);
    }
    public async Task CreateRandomEnginesAsync(int count)
    {
        long id = DateTime.UtcNow.Ticks;
        var samples = new NLHSampler(count).GenerateSamples()
            .Select((s, i) => new Engine($"{id}_{i}", s))
            .ToList();
        await _engineRepository.SaveEnginesAsync(samples);
    }
    public async Task<List<Engine>> PlayTournamentAsync(IEnumerable<string> engineNames, int type = 1, int numberGames = 10)
    {
        List<Engine> engines = await _engineRepository.GetEngines(engineNames);
        return type switch
        {
            1 => await PlaySwissSystemTournamentAsync(engines, numberGames),
            2 => await PlayRoundSystemTournamentAsync(engines, numberGames),
            _ => await PlaySwissSystemTournamentAsync(engines, numberGames)
        };
    }
    public async Task<List<Engine>> PlayRoundSystemTournamentAsync(List<Engine> engines, int numberGames)
    {
        for(int i = 0; i < engines.Count - 1; i++)
        {
            for(int j = i + 1; j < engines.Count; j++)
            {
                for(int k = 0; k < numberGames; k++)
                {
                    await _aiGameService.PlayGameAsync(engines[i], engines[j]);
                }
                // await _engineRepository.CreateEngineAsync(engines[i]);
                // await _engineRepository.CreateEngineAsync(engines[j]);
            }
        }
        await _engineRepository.SaveEnginesAsync(engines);
        return engines;
    }
    public async Task<List<Engine>> PlaySwissSystemTournamentAsync(List<Engine> engines, int numberGames)
    {
        var starters = new List<Engine>(engines);
        const int enginePerStage = 128;
        int startRound = (int)BitOperations.RoundUpToPowerOf2((uint)engines.Count) / enginePerStage;
        while(startRound > 1)
        {
            List<Engine> winners = [];
            for(int i = 1; i <= startRound; i++)
            {
                Console.WriteLine($"Round of {startRound}: {i}");
                var startInd = enginePerStage * (i - 1);
                int participantsCount = starters.Count < startInd + enginePerStage
                    ? starters.Count - 1 - startInd
                    : enginePerStage;
                winners.AddRange(await PlayStageAsync(starters.GetRange(startInd, participantsCount), numberGames));
            }
            startRound /= 2;
            starters = [];
            starters.AddRange(winners);
        }
        await _engineRepository.SaveEnginesAsync(engines);
        return await PlayStageAsync(starters, numberGames * 2);
    }
    private async Task<List<Engine>> PlayStageAsync(List<Engine> engines, int rounds = 10)
    {
        for (int round = 1; round <= rounds; round++)
        {
            engines.Sort((e1, e2) => CompareEngineScores(e2, e1));
            for (int i = 0; i < engines.Count; i += 2)
            {
                if (i + 1 < engines.Count)
                {
                    await _aiGameService.PlayGameAsync(engines[i], engines[i + 1]);
                }
            }
        }
        engines.Sort((e1, e2) => CompareEngineScores(e2, e1));
        int count = Math.Min((int)BitOperations.RoundUpToPowerOf2((uint)engines.Count) / 2, engines.Count);
        return engines.GetRange(0, count);
    }
    private static int CompareEngineScores(Engine one, Engine two)
    {
        double points1 = CalculateEngineScore(one);
        double points2 = CalculateEngineScore(two);
        return points1.CompareTo(points2);
    }
    private static double CalculateEngineScore(Engine engine)
    {
        return engine.Statistic.GeneralWins * 3 + engine.Statistic.OfficerWins * 2 + engine.Statistic.GoatWins
            + engine.Statistic.NormalVictoryWins * 0.1 + engine.Statistic.ClearedPoints * 0.1 + engine.Statistic.Draws * 0.05
            - engine.Statistic.GeneralLoses * 3 - engine.Statistic.OfficerLoses * 2 - engine.Statistic.GoatLoses
            - engine.Statistic.NormalVictoryLoses * 0.1;
    }
}
