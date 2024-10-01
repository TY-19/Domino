using Domino.Domain.Entities;

namespace Domino.Application.Interfaces;

public interface IGameService
{
    Game StartGame(string playerName, string opponentName);
    List<TileDetails> GetHand();
    LinkedList<DominoTile> GetTable();
    Game PlayTile(string tileId, int contactEdge, bool? isLeft);
    Game GrabTile();
    Game WaitOpponentTurn();
}
