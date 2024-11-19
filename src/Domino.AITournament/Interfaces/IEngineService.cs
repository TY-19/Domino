using Domino.AITournament.Models;
using Domino.Domain.Entities;

namespace Domino.AITournament.Interfaces;

public interface IEngineService
{
    Task<List<Engine>> GetEnginesAsync();
    Task<Engine?> GetEngineAsync(string name);
    Task<List<Engine>> CreateRandomEnginesAsync(int count);
    Task SaveEnginesAsync(List<Engine> engines);
    void UpdatePlayersStatistic(Game game, Engine player, Engine opponent);
}
