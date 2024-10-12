using Domino.Domain.Entities;

namespace Domino.Application.Interfaces;

public interface IGameRepository
{
    Game? GetGame(long gameId);
    void SaveGame(Game game);
}
