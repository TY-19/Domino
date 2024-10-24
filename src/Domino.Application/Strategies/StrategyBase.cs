using System.Collections.ObjectModel;
using Domino.Application.Interfaces;
using Domino.Application.Models;
using Domino.Domain.Entities;

namespace Domino.Application.Strategies;

public abstract class StrategyBase : IAiStrategy
{
    private List<PlayTileMove> _possibilities = [];
    protected ReadOnlyCollection<PlayTileMove> PossibleMoves = null!;
    public virtual Move SelectMove(GameView gameView)
    {
        _possibilities = gameView.Table.GetPossibleMoves(gameView.Player.Hand);
        PossibleMoves = _possibilities.AsReadOnly();
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
