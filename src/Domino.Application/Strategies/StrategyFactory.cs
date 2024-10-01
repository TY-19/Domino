using Domino.Application.Interfaces;

namespace Domino.Application.Strategies;

public class StrategyFactory
{
    public IAiStrategy SelectStrategy()
    {
        return new RandomStrategy();
    }
}