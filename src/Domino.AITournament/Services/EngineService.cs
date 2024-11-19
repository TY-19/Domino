using Domino.AITournament.Helpers;
using Domino.AITournament.Interfaces;
using Domino.AITournament.Models;
using Domino.Domain.Entities;
using Domino.Domain.Enums;

namespace Domino.AITournament.Services;

public class EngineService(IEngineRepository engineRepository) : IEngineService
{
    private readonly IEngineRepository _engineRepository = engineRepository;
    public async Task<List<Engine>> GetEnginesAsync()
    {
        return await _engineRepository.GetAllEnginesAsync();
    }
    public async Task<Engine?> GetEngineAsync(string name)
    {
        return await _engineRepository.GetEngineAsync(name);
    }
    public async Task<List<Engine>> CreateRandomEnginesAsync(int count)
    {
        long id = DateTime.UtcNow.Ticks;
        var samples = new NLHSampler(count).GenerateSamples()
            .Select((s, i) => new Engine($"{id}_{i}", s))
            .ToList();
        await _engineRepository.SaveEnginesAsync(samples);
        return samples;
    }
    public async Task SaveEnginesAsync(List<Engine> engines)
    {
        await _engineRepository.SaveEnginesAsync(engines);
    }
    public void UpdatePlayersStatistic(Game game, Engine player, Engine opponent)
    {
        if(game.GameResult?.IsEnded != true || game.GameResult == null || game.GameResult.IsInStatistic)
        {
            return;
        }
        foreach(var record in game.GameResult.PlayerResultRecords)
        {
            var engine = record.PlayerName == player.Name ? player : opponent;
            Update(record, game, engine);
        }
        game.GameResult.IsInStatistic = true;
    }
    private static void Update(PlayerResultRecord playerRecord, Game game, Engine player)
    {
        var playerStatistic = player.Statistic ?? new PlayerStatistic(playerRecord.PlayerName);
        var playerInfo = player.Player.Info;
        playerStatistic.GamesPlayed++;
        if(game.GameStatus.IsHunted(playerStatistic.PlayerName))
        {
            playerStatistic.WasHunted++;
        }
        if(game.GameStatus.IsHunter(playerRecord.PlayerName))
        {
            playerStatistic.WasHunter++;
        }
        switch(playerRecord.PlayerResult)
        {
            case PlayerResultType.Draw:
                AddDraw(playerStatistic, playerInfo, playerRecord);
                break;
            case PlayerResultType.Win:
                AddWin(playerStatistic, playerInfo, playerRecord, game.GameStatus, game.GameResult!);
                break;
            case PlayerResultType.Lose:
                AddLose(playerStatistic, playerInfo, playerRecord, game.GameStatus, game.GameResult!);
                break;
        }
    }
    private static void AddDraw(PlayerStatistic playerStatistic, PlayerInfo playerInfo,
        PlayerResultRecord playerRecord)
    {
        playerStatistic.Draws++;
        playerStatistic.TotalPointsLeftWith += playerRecord.PointsLeft;
        playerInfo.CurrentPointCount += playerRecord.PointsLeft;
    }
    private static void AddWin(PlayerStatistic playerStatistic, PlayerInfo playerInfo,
        PlayerResultRecord playerRecord, GameStatus gameStatus, GameResult gameResult)
    {
        playerStatistic.Wins++;
        if(gameStatus.IsHunter(playerRecord.PlayerName))
        {
            playerStatistic.SuccessfulHunt++;
        }
        playerInfo.CurrentPointCount = 0;
        Action<PlayerStatistic, GameStatus> updateWinnerFunction =
            _updateRules[(gameResult?.Result?.VictoryType ?? VictoryType.Normal, true)];
        updateWinnerFunction(playerStatistic, gameStatus);
    }
    private static void AddLose(PlayerStatistic playerStatistic, PlayerInfo playerInfo,
        PlayerResultRecord playerRecord, GameStatus gameStatus, GameResult gameResult)
    {
        playerStatistic.Loses++;
        playerStatistic.TotalPointsLeftWith += playerRecord.PointsLeft;
        playerInfo.CurrentPointCount = gameResult?.Result?.VictoryType == VictoryType.Normal
            ? playerInfo.CurrentPointCount + playerRecord.PointsLeft : 0;
        Action<PlayerStatistic, GameStatus> updateLoserFunction =
            _updateRules[(gameResult?.Result?.VictoryType ?? VictoryType.Normal, false)];
        updateLoserFunction(playerStatistic, gameStatus);
    }
    private static readonly Dictionary<(VictoryType, bool) , Action<PlayerStatistic, GameStatus>> _updateRules = new()
    {
        { (VictoryType.ClearedPoints, true),  HandleClearPoints },
        { (VictoryType.ClearedPoints, false),  (_, _) => {} },
        { (VictoryType.Normal, true), (ps, _) => ps.NormalVictoryWins++ },
        { (VictoryType.Normal, false), (ps, _) => ps.NormalVictoryLoses++ },
        { (VictoryType.Goat, true), (ps, _) => ps.GoatWins++ },
        { (VictoryType.Goat, false), (ps, _) => ps.GoatLoses++ },
        { (VictoryType.Officer, true), (ps, _) => ps.OfficerWins++ },
        { (VictoryType.Officer, false), (ps, _) => ps.OfficerLoses++ },
        { (VictoryType.General, true), (ps, _) => ps.GeneralWins++ },
        { (VictoryType.General, false), (ps, _) => ps.GeneralLoses++ },
        { (VictoryType.Draw, true),  (ps, _) => ps.Draws++ },
        { (VictoryType.Draw, false),  (ps, _) => ps.Draws++ },
    };
    private static void HandleClearPoints(PlayerStatistic ps, GameStatus gs)
    {
        if(gs.Hunted.Contains(ps.PlayerName))
        {
            ps.ClearedPoints++;
        }
        if(gs.Hunted.Any(p => p != ps.PlayerName))
        {
            ps.SuccessfulHunt++;
        }
    }
}
