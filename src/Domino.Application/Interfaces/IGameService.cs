using Domino.Domain.Entities;

namespace Domino.Application.Interfaces;

public interface IGameService
{
    Game StartGame(string playerName, string opponentName);
    List<DominoTile> GetHand();
    LinkedList<DominoTile> GetTable();
    Game PlayTile(string tileId);
    Game GrabTile();
    Game WaitOpponentTurn();
}
