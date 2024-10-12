using Domino.Application.Interfaces;
using Domino.Domain.Entities;
using LiteDB;
using Microsoft.Extensions.Configuration;

namespace Domino.Infrastructure.Repositories;

public class GameRepository : IGameRepository
{
    private readonly string _connectionString;
    public GameRepository(IConfiguration configuration)
    {
        _connectionString = configuration["ConnectionStrings:LiteDb"] ?? "";
    }
    public Game? GetGame(long gameId)
    {
        using var db = new LiteDatabase(_connectionString);
        var col = db.GetCollection<Game>("games");
        return col.Find(g => g.Id == gameId).FirstOrDefault();
    }
    public void SaveGame(Game game)
    {
        using var db = new LiteDatabase(_connectionString);
        var col = db.GetCollection<Game>("games");
        col.Upsert(game.Id, game);
    }
}
