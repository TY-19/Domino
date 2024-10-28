using Domino.Application.Interfaces;
using Domino.Domain.Entities;

namespace Domino.Application.Strategies;

public class StrategyFactory : IStrategyFactory
{
    public IAiStrategy SelectStrategy(Player player)
    {
        if(player.Name == "AI")
        {
            return new RandomStrategy();
        }
        if(player is AiPlayer aiPlayer)
        {
            return new AdvancedStrategy(aiPlayer.Coefficients);
        }
        return new RandomStrategy();
    }
}
