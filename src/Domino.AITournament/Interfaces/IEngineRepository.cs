using Domino.AITournament.Models;

namespace Domino.AITournament.Interfaces;

public interface IEngineRepository
{
    Task<List<Engine>> GetAllEnginesAsync();
    Task<Engine?> GetEngineAsync(string name);
    Task CreateEngineAsync(Engine engine);
    Task CreateEnginesAsync(List<Engine> engines);
}
