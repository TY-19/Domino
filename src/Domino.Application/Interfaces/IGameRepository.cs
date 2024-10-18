using Domino.Domain.Entities;

namespace Domino.Application.Interfaces;

public interface IGameRepository
{
    Task<Game?> GetGameAsync(long gameId);
    Task SaveGameAsync(Game game);
}
