using Domino.Domain.Entities;

namespace Domino.Application.Interfaces;

public interface IPlayerStatisticService
{
    IEnumerable<PlayerStatistic> GetAllPlayersStatistics();
    void UpdateCreatePlayersStatistic(GameStatus gameStatus);
}
