using Domino.Application.Interfaces;
using Domino.Domain.Entities;

namespace Domino.Application.Services;

public class PlayerService : IPlayerService
{
    private readonly IPlayerRepository _repo;
    public PlayerService(IPlayerRepository repo)
    {
        _repo = repo;
    }
    public async Task<IEnumerable<PlayerInfo>> GetAllPlayersInfoAsync()
    {
        return await _repo.GetAllPlayersInfoAsync();
    }
    public async Task<PlayerInfo> GetPlayerInfoAsync(string playerName)
    {
        return await _repo.GetPlayerInfoAsync(playerName);
    }
    public async Task UpdatePlayerInfoAsync(PlayerInfo playerInfo)
    {
        await _repo.UpdatePlayerInfoAsync(playerInfo);
    }
    public async Task<IEnumerable<PlayerStatistic>> GetAllPlayersStatisticsAsync()
    {
        return await _repo.GetAllPlayersStatisticsAsync();
    }
    public async Task<PlayerStatistic> GetPlayerStatisticsAsync(string playerName)
    {
        var statistics = await _repo.GetPlayerStatisticsAsync(playerName);
        return statistics ?? new PlayerStatistic(playerName);
    }
    public async Task DeleteAllStatistic()
    {
        await _repo.DeleteAllStatistic();
    }
}
