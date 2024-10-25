using Domino.Application.Models;
using Domino.Domain.Entities;

namespace Domino.Application.Strategies;

public class RandomStrategy : StrategyBase
{
    protected override PlayTileMove SelectPlayTileMove(GameView gameView)
    {
        var rnd = new Random();
        int tileIndex = rnd.Next(PossibleMoves.Count - 1);
        return PossibleMoves[tileIndex];
    }
}
