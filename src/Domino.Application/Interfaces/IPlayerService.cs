using Domino.Domain.Entities;

namespace Domino.Application.Interfaces;

public interface IPlayerService
{
    Task<IEnumerable<PlayerInfo>> GetAllPlayersInfoAsync();
    Task<PlayerInfo?> GetPlayerInfoAsync(string playerName);
    Task<Player> CreatePlayerAsync(string playerName, bool isAi,
        StrategyCoefficients? coefficients);
    Task SeedDefaultPlayers();
    Task UpdatePlayerInfoAsync(PlayerInfo playerInfo);
    Task<IEnumerable<PlayerStatistic>> GetAllPlayersStatisticsAsync();
    Task<PlayerStatistic> GetPlayerStatisticsAsync(string playerName);
    Task DeleteAllStatistic();
}
