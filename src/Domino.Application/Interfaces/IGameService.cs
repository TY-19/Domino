using Domino.Application.Models;
using Domino.Domain.Entities;

namespace Domino.Application.Interfaces;

public interface IGameService
{
    GameView? GetCurrentGame();
    GameView StartGame(string playerName, string opponentName);
    GameView PlayTile(string tileId, bool? isLeft);
    GameView GrabTile();
    GameView WaitOpponentTurn();
}
