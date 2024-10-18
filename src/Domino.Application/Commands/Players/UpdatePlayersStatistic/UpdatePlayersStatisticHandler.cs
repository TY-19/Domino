using Domino.Application.Interfaces;
using Domino.Domain.Entities;
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
        await UpdateAsync(gameStatus.LoserPointsCount[1].Item1, gameStatus.LoserPointsCount[1].Item2, gameStatus);
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
            Action<PlayerStatistic, GameStatus> updateFunction = _updateRules[(gameStatus.VictoryType!, true)];
            updateFunction(playerStatistic, gameStatus);
        }
        else
        {
            playerStatistic.Loses++;
            playerStatistic.TotalPointsLeftWith += pointsCount;
            playerInfo.CurrentPointCount = gameStatus.VictoryType == "Normal Victory"
                ? playerInfo.CurrentPointCount + pointsCount : 0;
            Action<PlayerStatistic, GameStatus> updateFunction = _updateRules[(gameStatus.VictoryType!, false)];
            updateFunction(playerStatistic, gameStatus);
        }
        await _playerRepository.UpdatePlayerStatisticAsync(playerStatistic);
        await _playerRepository.UpdatePlayerInfoAsync(playerInfo);
    }
    private static readonly Dictionary<(string, bool) , Action<PlayerStatistic, GameStatus>> _updateRules = new()
    {
        { ("Cleared points", true),  HandleClearPoints },
        { ("Cleared points", false),  (_, _) => {} },
        { ("Normal Victory", true), (ps, _) => ps.NormalVictoryWins++ },
        { ("Normal Victory", false), (ps, _) => ps.NormalVictoryLoses++ },
        { ("Goat", true), (ps, _) => ps.GoatWins++ },
        { ("Goat", false), (ps, _) => ps.GoatLoses++ },
        { ("Officer", true), (ps, _) => ps.OfficerWins++ },
        { ("Officer", false), (ps, _) => ps.OfficerLoses++ },
        { ("General", true), (ps, _) => ps.GeneralWins++ },
        { ("General", false), (ps, _) => ps.GeneralLoses++ },
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
