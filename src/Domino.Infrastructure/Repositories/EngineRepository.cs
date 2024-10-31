using Domino.AITournament.Interfaces;
using Domino.AITournament.Models;
using LiteDB;
using Microsoft.Extensions.Configuration;

namespace Domino.Infrastructure.Repositories;

public class EngineRepository : IEngineRepository
{
    private const string Engines = "engines";
    private readonly string _connectionString;
    public EngineRepository(IConfiguration configuration)
    {
        _connectionString = configuration["ConnectionStrings:LiteDb"] ?? "";
    }
    public Task<Engine?> GetEngineAsync(string name)
    {
        using var db = new LiteDatabase(_connectionString);
        var col = db.GetCollection<Engine>(Engines);
        return Task.FromResult(col.Find(e => e.Statistic.PlayerName == name).FirstOrDefault());
    }
    public Task<List<Engine>> GetAllEnginesAsync()
    {
        using var db = new LiteDatabase(_connectionString);
        var col = db.GetCollection<Engine>(Engines);
        return Task.FromResult(col.FindAll().ToList());
    }
    
    public Task CreateEngineAsync(Engine engine)
    {
        using var db = new LiteDatabase(_connectionString);
        var col = db.GetCollection<Engine>(Engines);
        col.Upsert(engine.Player.Name, engine);
        return Task.CompletedTask;
    }
    public Task SaveEnginesAsync(List<Engine> engines)
    {
        using var db = new LiteDatabase(_connectionString);
        var col = db.GetCollection<Engine>(Engines);
        foreach(var engine in engines)
        {
            col.Upsert(engine.Statistic.PlayerName, engine);
        }
        return Task.CompletedTask;
    }
}
