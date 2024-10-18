using Domino.Domain.Entities;

namespace Domino.Application.Interfaces;

public interface IStrategyFactory
{
    IAiStrategy SelectStrategy(Player player);
}
