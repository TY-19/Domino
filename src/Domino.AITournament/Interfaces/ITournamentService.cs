using Domino.AITournament.Models;

namespace Domino.AITournament.Interfaces;

public interface ITournamentService
{
    Task<List<Engine>> PlayTournamentAsync(IEnumerable<string> engineNames, int type = 1, int numberGames = 10);
}
