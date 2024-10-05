using Domino.Application.Interfaces;
using Domino.Application.Models;
using Domino.Application.Strategies;
using Domino.Domain.Entities;

namespace Domino.Application.Services;

public class AiPlayerService : IAiPlayerService
{
    private StrategyFactory _strategyFactory;
    private Player Player { get; set; }
    public AiPlayerService(Player player)
    {
        Player = player;
        _strategyFactory = new();
    }
    public Move MakeMove(GameView gameView)
    {
        List<(TileDetails tileDetails, int contactEdge)> possibilities = 
            gameView.Table.GetPossibleMoves(gameView.PlayerHand);
        if (possibilities.Count == 0)
        {
            return new GrabTileMove();
        }
        else if (possibilities.Count == 1)
        {
            return new PlayTileMove(possibilities[0].tileDetails, possibilities[0].contactEdge);
        }
        else
        {
            var strategy = _strategyFactory.SelectStrategy();
            gameView.PossibleTilesToPlay = possibilities;
            return strategy.SelectMove(gameView);
        }
    }
}
