using Domino.Application.Interfaces;
using Domino.Domain.Entities;
using LiteDB;
using Microsoft.Extensions.Configuration;

namespace Domino.Infrastructure.Repositories;

public class PlayerStatisticRepository : IPlayerStatisticRepository
{
    private readonly string _connectionString;
    public PlayerStatisticRepository(IConfiguration configuration)
    {
        _connectionString = configuration["ConnectionStrings:LiteDb"] ?? "";
    }
    public IEnumerable<PlayerStatistic> GetAllPlayersStatistics()
    {
        using var db = new LiteDatabase(_connectionString);
        var col = db.GetCollection<PlayerStatistic>("playersStatistics");
        Console.WriteLine(col.Count());
        return col.FindAll().ToList();
    }
    public PlayerStatistic? GetPlayerStatistic(string playerName)
    {
        using var db = new LiteDatabase(_connectionString);
        var col = db.GetCollection<PlayerStatistic>("playersStatistics");
        return col.Find(e => e.PlayerName == playerName).FirstOrDefault();
    }
    public void UpdatePlayerStatistic(PlayerStatistic playerStatistic)
    {
        using var db = new LiteDatabase(_connectionString);
        var col = db.GetCollection<PlayerStatistic>("playersStatistics");
        col.Upsert(playerStatistic.PlayerName, playerStatistic);
    }
}
