using Domino.Application.Interfaces;
using Domino.Domain.Entities;
using Domino.Domain.Enums;
using MediatR;

namespace Domino.Application.Commands.Players.UpdatePlayersStatistic;

public class UpdatePlayersStatisticCommandHandler : IRequestHandler<UpdatePlayersStatisticCommand>
{
    private readonly IPlayerRepository _playerRepository;
    public UpdatePlayersStatisticCommandHandler(IPlayerRepository playerRepository)
    {
        _playerRepository = playerRepository;
    }
    public async Task Handle(UpdatePlayersStatisticCommand command, CancellationToken cancellationToken)
    {
        var gameStatus = command.Game.GameStatus;
        var gameResult = command.Game.GameResult;
        if(gameResult?.IsEnded != true || gameResult.IsInStatistic)
        {
            return;
        }
        foreach(var record in gameResult.PlayerResultRecords)
        {
            await UpdateAsync(record, gameStatus, gameResult);
        }
        gameResult.IsInStatistic = true;
    }
    private async Task UpdateAsync(PlayerResultRecord playerRecord, GameStatus gameStatus, GameResult gameResult)
    {
        var playerStatistic = await _playerRepository.GetPlayerStatisticsAsync(playerRecord.PlayerName)
            ?? new PlayerStatistic(playerRecord.PlayerName);
        var playerInfo = await _playerRepository.GetPlayerInfoAsync(playerRecord.PlayerName);
        playerStatistic.GamesPlayed++;
        if(gameStatus.IsHunted(playerStatistic.PlayerName))
        {
            playerStatistic.WasHunted++;
        }
        if(gameStatus.IsHunter(playerRecord.PlayerName))
        {
            playerStatistic.WasHunter++;
        }
        switch(playerRecord.PlayerResult)
        {
            case PlayerResultType.Draw:
                playerStatistic.Draws++;
                playerStatistic.TotalPointsLeftWith += playerRecord.PointsLeft;
                playerInfo.CurrentPointCount += playerRecord.PointsLeft;
                break;
            case PlayerResultType.Win:
                playerStatistic.Wins++;
                playerInfo.CurrentPointCount = 0;
                Action<PlayerStatistic, GameStatus> updateWinnerFunction =
                    _updateRules[(gameResult?.VictoryType ?? VictoryType.Normal, true)];
                updateWinnerFunction(playerStatistic, gameStatus);
                break;
            case PlayerResultType.Lose:
                playerStatistic.Loses++;
                playerStatistic.TotalPointsLeftWith += playerRecord.PointsLeft;
                playerInfo.CurrentPointCount = gameResult?.VictoryType == VictoryType.Normal
                    ? playerInfo.CurrentPointCount + playerRecord.PointsLeft : 0;
                Action<PlayerStatistic, GameStatus> updateLoserFunction =
                    _updateRules[(gameResult?.VictoryType ?? VictoryType.Normal, false)];
                updateLoserFunction(playerStatistic, gameStatus);
                break;
        }
        await _playerRepository.UpdatePlayerStatisticAsync(playerStatistic);
        await _playerRepository.UpdatePlayerInfoAsync(playerInfo);
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
