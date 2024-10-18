using Domino.Application.Interfaces;
using Domino.Domain.Entities;

namespace Domino.Application.Strategies;

public class StrategyFactory : IStrategyFactory
{
    public IAiStrategy SelectStrategy(Player player)
    {
        return new RandomStrategy();
    }
}