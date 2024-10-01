using Domino.Application.Interfaces;
using Domino.Domain.Entities;

namespace Domino.Application.Strategies;

public class RandomStrategy : IAiStrategy
{
    public PlayTileMove SelectMove(GameView gameView)
    {
        var rnd = new Random();
        int tileIndex = rnd.Next(gameView.PossibleTilesToPlay.Count - 1);
        var (tileDetails, contactEdge) = gameView.PossibleTilesToPlay[tileIndex];
        return new PlayTileMove(tileDetails, contactEdge);
    }
}
