using Domino.Application.Interfaces;
using Domino.Domain.Entities;
using LiteDB;
using Microsoft.Extensions.Configuration;

namespace Domino.Infrastructure.Repositories;

public class PlayerStatisticRepository : IPlayerRepository
{
    private readonly string _connectionString;
    public PlayerStatisticRepository(IConfiguration configuration)
    {
        _connectionString = configuration["ConnectionStrings:LiteDb"] ?? "";
    }
    public Task<IEnumerable<PlayerInfo>> GetAllPlayersInfoAsync()
    {
        using var db = new LiteDatabase(_connectionString);
        var col = db.GetCollection<PlayerInfo>("playersInfo");
        return Task.FromResult<IEnumerable<PlayerInfo>>(col.FindAll().ToList());
    }
    public Task<PlayerInfo> GetPlayerInfoAsync(string playerName)
    {
        using var db = new LiteDatabase(_connectionString);
        var col = db.GetCollection<PlayerInfo>("playersInfo");
        return Task.FromResult(col.Find(p => p.PlayerName == playerName).FirstOrDefault()
            ?? new PlayerInfo() { PlayerName = playerName });
    }
    public Task UpdatePlayerInfoAsync(PlayerInfo playerInfo)
    {
        using var db = new LiteDatabase(_connectionString);
        var col = db.GetCollection<PlayerInfo>("playersInfo");
        col.Upsert(playerInfo.PlayerName, playerInfo);
        return Task.CompletedTask;
    }
    public Task<IEnumerable<PlayerStatistic>> GetAllPlayersStatisticsAsync()
    {
        using var db = new LiteDatabase(_connectionString);
        var col = db.GetCollection<PlayerStatistic>("playersStatistics");
        return Task.FromResult<IEnumerable<PlayerStatistic>>(col.FindAll().ToList());
    }
    public Task<PlayerStatistic?> GetPlayerStatisticAsync(string playerName)
    {
        using var db = new LiteDatabase(_connectionString);
        var col = db.GetCollection<PlayerStatistic>("playersStatistics");
        return Task.FromResult(col.Find(e => e.PlayerName == playerName).FirstOrDefault());
    }
    public Task UpdatePlayerStatisticAsync(PlayerStatistic playerStatistic)
    {
        using var db = new LiteDatabase(_connectionString);
        var col = db.GetCollection<PlayerStatistic>("playersStatistics");
        col.Upsert(playerStatistic.PlayerName, playerStatistic);
        return Task.CompletedTask;
    }
}
