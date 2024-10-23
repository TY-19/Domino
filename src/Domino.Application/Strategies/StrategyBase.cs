using Domino.Application.Interfaces;
using Domino.Application.Models;
using Domino.Domain.Entities;

namespace Domino.Application.Strategies;

public abstract class StrategyBase : IAiStrategy
{
    protected List<PlayTileMove> _possibilities = [];
    public virtual Move SelectMove(GameView gameView)
    {

        _possibilities = gameView.Table.GetPossibleMoves(gameView.Player.Hand);
        if (_possibilities.Count == 0)
        {
            return new GrabTileMove();
        }
        else if (_possibilities.Count == 1)
        {
            return _possibilities[0];
        }
        else
        {
            return SelectPlayTileMove(gameView);
        }
    }
    protected abstract PlayTileMove SelectPlayTileMove(GameView gameView);
}
