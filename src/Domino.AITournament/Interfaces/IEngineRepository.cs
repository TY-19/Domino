using Domino.AITournament.Models;

namespace Domino.AITournament.Interfaces;

public interface IEngineRepository
{
    Task<List<Engine>> GetAllEnginesAsync();
    Task<Engine?> GetEngineAsync(string name);
    Task CreateEngineAsync(Engine engine);
    Task SaveEnginesAsync(List<Engine> engines);
}
