using Domino.Application.Extensions;
using Domino.Application.Interfaces;
using Domino.Domain.Entities;
using MediatR;

namespace Domino.Application.Commands.Games.SelectOpponentMove;

public class SelectOpponentMoveCommandHandler : IRequestHandler<SelectOpponentMoveCommand, Move>
{
    private readonly IStrategyFactory _strategyFactory;
    public SelectOpponentMoveCommandHandler(IStrategyFactory strategyFactory)
    {
        _strategyFactory = strategyFactory;
    }
    public Task<Move> Handle(SelectOpponentMoveCommand command, CancellationToken cancellationToken)
    {
        var strategy = _strategyFactory.SelectStrategy(command.Game.Opponent);
        return Task.FromResult(strategy.SelectMove(command.Game.ToGameView(command.Game.Opponent.Name)));
    }
}
