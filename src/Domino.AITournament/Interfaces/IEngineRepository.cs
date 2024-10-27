using Domino.AITournament.Models;

namespace Domino.AITournament.Interfaces;

public interface IEngineRepository
{
    Task<List<Engine>> GetAllEnginesAsync();
    Task CreateEngineAsync(Engine engine);
}
