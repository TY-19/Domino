using Domino.Application.Interfaces;
using Domino.Domain.Entities;
using Domino.Domain.Enums;
using MediatR;

namespace Domino.Application.Commands.Players.UpdatePlayersStatistic;

public class UpdatePlayersStatisticHandler : IRequestHandler<UpdatePlayersStatisticCommand>
{
    private readonly IPlayerRepository _playerRepository;
    public UpdatePlayersStatisticHandler(IPlayerRepository playerRepository)
    {
        _playerRepository = playerRepository;
    }
    public async Task Handle(UpdatePlayersStatisticCommand command, CancellationToken cancellationToken)
    {
        var gameStatus = command.GameStatus;
        if(!gameStatus.IsEnded || gameStatus.IsInStatistic)
        {
            return;
        }
        await UpdateAsync(gameStatus.LoserPointsCount[0].Item1, gameStatus.LoserPointsCount[0].Item2, gameStatus);
        if(gameStatus.Winner != null)
        {
            await UpdateAsync(gameStatus.Winner, 0, gameStatus);
        }
        else
        {
            await UpdateAsync(gameStatus.LoserPointsCount[1].Item1, gameStatus.LoserPointsCount[1].Item2, gameStatus);
        }
        gameStatus.IsInStatistic = true;
    }
    private async Task UpdateAsync(string playerName, int pointsCount, GameStatus gameStatus)
    {
        var playerStatistic = await _playerRepository.GetPlayerStatisticAsync(playerName) ?? new PlayerStatistic(playerName);
        var playerInfo = await _playerRepository.GetPlayerInfoAsync(playerName);
        playerStatistic.GamesPlayed++;
        if(gameStatus.HuntPlayers.Contains(playerStatistic.PlayerName))
        {
            playerStatistic.WasHunted++;
        }
        if(gameStatus.HuntPlayers.Any(p => p != playerName))
        {
            playerStatistic.WasHunter++;
        }
        if(gameStatus.IsDraw)
        {
            playerStatistic.Draws++;
            playerStatistic.TotalPointsLeftWith += pointsCount;
            playerInfo.CurrentPointCount += pointsCount;
        }
        else if(gameStatus.Winner == playerName)
        {
            playerStatistic.Wins++;
            playerInfo.CurrentPointCount = 0;
            Action<PlayerStatistic, GameStatus> updateFunction = _updateRules[(gameStatus.VictoryType!.Value, true)];
            updateFunction(playerStatistic, gameStatus);
        }
        else
        {
            playerStatistic.Loses++;
            playerStatistic.TotalPointsLeftWith += pointsCount;
            playerInfo.CurrentPointCount = gameStatus.VictoryType == VictoryType.Normal
                ? playerInfo.CurrentPointCount + pointsCount : 0;
            Action<PlayerStatistic, GameStatus> updateFunction = _updateRules[(gameStatus.VictoryType!.Value, false)];
            updateFunction(playerStatistic, gameStatus);
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
    };
    private static void HandleClearPoints(PlayerStatistic ps, GameStatus gs)
    {
        if(gs.HuntPlayers.Contains(ps.PlayerName))
        {
            ps.ClearedPoints++;
        }
        if(gs.HuntPlayers.Any(p => p != ps.PlayerName))
        {
            ps.SuccessfulHunt++;
        }
    }
}
