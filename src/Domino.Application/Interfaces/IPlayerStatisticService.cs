using Domino.Domain.Entities;

namespace Domino.Application.Interfaces;

public interface IPlayerStatisticService
{
    IEnumerable<PlayerInfo> GetAllPlayersInfo();
    PlayerInfo GetPlayerInfo(string playerName);
    void UpdatePlayerInfo(PlayerInfo playerInfo);
    IEnumerable<PlayerStatistic> GetAllPlayersStatistics();
    void UpdateCreatePlayersStatistic(GameStatus gameStatus);
}
