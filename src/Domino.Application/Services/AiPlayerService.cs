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
        var strategy = _strategyFactory.SelectStrategy();
        return strategy.SelectMove(gameView);
    }
}
