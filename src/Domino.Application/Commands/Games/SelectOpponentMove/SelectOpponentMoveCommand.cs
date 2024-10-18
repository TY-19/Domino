using Domino.Domain.Entities;
using MediatR;

namespace Domino.Application.Commands.Games.SelectOpponentMove;

public class SelectOpponentMoveCommand : IRequest<Move>
{
    public Game Game { get; set; } = null!;
}
