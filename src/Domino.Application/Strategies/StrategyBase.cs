using Domino.Application.Interfaces;
using Domino.Application.Models;
using Domino.Domain.Entities;

namespace Domino.Application.Strategies;

public abstract class StrategyBase : IAiStrategy
{
    protected List<(TileDetails tileDetails, int contactEdge)> _possibilities = [];
    public virtual Move SelectMove(GameView gameView)
    {

        _possibilities = gameView.Table.GetPossibleMoves(gameView.Player.Hand);
        if (_possibilities.Count == 0)
        {
            return new GrabTileMove();
        }
        else if (_possibilities.Count == 1)
        {
            return new PlayTileMove(_possibilities[0].tileDetails, _possibilities[0].contactEdge);
        }
        else
        {
            return SelectPlayTileMove(gameView);
        }
    }
    protected abstract PlayTileMove SelectPlayTileMove(GameView gameView);
}
