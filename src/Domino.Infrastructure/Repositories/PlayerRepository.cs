using Domino.Application.Interfaces;
using Domino.Domain.Entities;
using LiteDB;
using Microsoft.Extensions.Configuration;

namespace Domino.Infrastructure.Repositories;

public class PlayerRepository : IPlayerRepository
{
    private const string PlayersInfo = "playersInfo";
    private const string PlayersStatistics = "playersStatistics";
    private readonly string _connectionString;
    public PlayerRepository(IConfiguration configuration)
    {
        _connectionString = configuration["ConnectionStrings:LiteDb"] ?? "";
    }
    public Task<IEnumerable<PlayerInfo>> GetAllPlayersInfoAsync()
    {
        using var db = new LiteDatabase(_connectionString);
        var col = db.GetCollection<PlayerInfo>(PlayersInfo);
        return Task.FromResult<IEnumerable<PlayerInfo>>(col.FindAll().ToList());
    }
    public Task<PlayerInfo?> GetPlayerInfoAsync(string playerName)
    {
        using var db = new LiteDatabase(_connectionString);
        var col = db.GetCollection<PlayerInfo>(PlayersInfo);
        return Task.FromResult(col.Find(p => p.PlayerName == playerName).FirstOrDefault());
    }
    public Task UpdatePlayerInfoAsync(PlayerInfo playerInfo)
    {
        using var db = new LiteDatabase(_connectionString);
        var col = db.GetCollection<PlayerInfo>(PlayersInfo);
        col.Upsert(playerInfo.PlayerName, playerInfo);
        return Task.CompletedTask;
    }
    public Task<IEnumerable<PlayerStatistic>> GetAllPlayersStatisticsAsync()
    {
        using var db = new LiteDatabase(_connectionString);
        var col = db.GetCollection<PlayerStatistic>(PlayersStatistics);
        return Task.FromResult<IEnumerable<PlayerStatistic>>(col.FindAll().ToList());
    }
    public Task<PlayerStatistic?> GetPlayerStatisticsAsync(string playerName)
    {
        using var db = new LiteDatabase(_connectionString);
        var col = db.GetCollection<PlayerStatistic>(PlayersStatistics);
        return Task.FromResult(col.Find(e => e.PlayerName == playerName).FirstOrDefault());
    }
    public Task UpdatePlayerStatisticAsync(PlayerStatistic playerStatistic)
    {
        using var db = new LiteDatabase(_connectionString);
        var col = db.GetCollection<PlayerStatistic>(PlayersStatistics);
        col.Upsert(playerStatistic.PlayerName, playerStatistic);
        return Task.CompletedTask;
    }
    public Task DeleteAllStatistic()
    {
        using var db = new LiteDatabase(_connectionString);
        db.DropCollection(PlayersStatistics);
        return Task.CompletedTask;
    }
}
