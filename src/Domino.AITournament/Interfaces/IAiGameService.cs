using Domino.AITournament.Models;
using Domino.Application.Models;

namespace Domino.AITournament.Interfaces;

public interface IAiGameService
{
    Task<GameView?> PlayGameAsync(Engine one, Engine two);
}
