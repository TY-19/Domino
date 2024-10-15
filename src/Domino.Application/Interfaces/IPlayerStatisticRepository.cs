using Domino.Domain.Entities;

namespace Domino.Application.Interfaces;

public interface IPlayerStatisticRepository
{
    IEnumerable<PlayerInfo> GetAllPlayersInfo();
    PlayerInfo GetPlayerInfo(string playerName);
    void UpdatePlayerInfo(PlayerInfo playerInfo);
    IEnumerable<PlayerStatistic> GetAllPlayersStatistics();
    PlayerStatistic? GetPlayerStatistic(string playerName);
    void UpdatePlayerStatistic(PlayerStatistic playerStatistic);
}
