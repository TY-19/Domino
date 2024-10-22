using Domino.Domain.Entities;

namespace Domino.Application.Interfaces;

public interface IPlayerRepository
{
    Task<IEnumerable<PlayerInfo>> GetAllPlayersInfoAsync();
    Task<PlayerInfo> GetPlayerInfoAsync(string playerName);
    Task UpdatePlayerInfoAsync(PlayerInfo playerInfo);
    Task<IEnumerable<PlayerStatistic>> GetAllPlayersStatisticsAsync();
    Task<PlayerStatistic?> GetPlayerStatisticAsync(string playerName);
    Task UpdatePlayerStatisticAsync(PlayerStatistic playerStatistic);
    Task DeleteAllStatistic();
}
