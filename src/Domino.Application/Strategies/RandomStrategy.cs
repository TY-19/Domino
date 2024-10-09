using Domino.Application.Interfaces;
using Domino.Application.Models;
using Domino.Domain.Entities;

namespace Domino.Application.Strategies;

public class RandomStrategy : StrategyBase
{
    protected override PlayTileMove SelectPlayTileMove(GameView gameView)
    {
        var rnd = new Random();
        int tileIndex = rnd.Next(_possibilities.Count - 1);
        var (tileDetails, contactEdge) = _possibilities[tileIndex];
        return new PlayTileMove(tileDetails, contactEdge);
    }
}
