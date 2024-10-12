using Domino.Domain.Entities;

namespace Domino.Application.Interfaces;

public interface IPlayerStatisticRepository
{
    IEnumerable<PlayerStatistic> GetAllPlayersStatistics();
    PlayerStatistic? GetPlayerStatistic(string playerName);
    void UpdatePlayerStatistic(PlayerStatistic playerStatistic);
}
