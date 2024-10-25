using Domino.Application.Interfaces;
using Domino.Domain.Entities;

namespace Domino.Application.Strategies;

public class StrategyFactory : IStrategyFactory
{
    public IAiStrategy SelectStrategy(Player player)
    {
        return player.Name switch
        {
            "AI" => new RandomStrategy(),
            "AI2" => new AdvancedStrategy(),
            _ => new RandomStrategy()
        };
    }
}
