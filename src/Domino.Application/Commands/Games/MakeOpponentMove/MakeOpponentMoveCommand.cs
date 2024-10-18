using Domino.Domain.Entities;
using MediatR;

namespace Domino.Application.Commands.Games.MakeOpponentMove;

public class MakeOpponentMoveCommand : IRequest<Game>
{
    public Game Game { get; set; } = null!;
    public Move? Move { get; set; }
}
