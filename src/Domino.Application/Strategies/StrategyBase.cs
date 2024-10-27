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
        if(IsDoublePlayPossible(gameView, out var doublePlayMove)
            && doublePlayMove != null)
        {
            return doublePlayMove;
        }
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
    private static bool IsDoublePlayPossible(GameView gameView, out DoublePlayMove? move)
    {
        move = null;
        if(gameView.Table.TilesOnTable.Count > 0
            && gameView.Table.LeftFreeEnd != null
            && gameView.Table.LeftFreeEnd != null
            && gameView.Table.LeftFreeEnd != gameView.Table.RightFreeEnd)
        {
            var doubleOne = gameView.Player.Hand
                .FirstOrDefault(t => t.IsDouble && t.SideA == gameView.Table.LeftFreeEnd);
            var doubleTwo = gameView.Player.Hand
                .FirstOrDefault(t => t.IsDouble && t.SideA == gameView.Table.RightFreeEnd);
            if(doubleOne != null && doubleTwo != null)
            {
                move = new DoublePlayMove(doubleOne, doubleTwo);
                return true;
            }
        }
        return false;
    }
}
