using Domino.Domain.Entities;

namespace Domino.Application.Interfaces;

public interface IPlayerService
{
    Task<IEnumerable<PlayerInfo>> GetAllPlayersInfoAsync();
    Task<PlayerInfo> GetPlayerInfoAsync(string playerName);
    Task UpdatePlayerInfoAsync(PlayerInfo playerInfo);
    Task<IEnumerable<PlayerStatistic>> GetAllPlayersStatisticsAsync();
    Task DeleteAllStatistic();
}
