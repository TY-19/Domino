using Domino.Domain.Entities;
using MediatR;

namespace Domino.Application.Commands.Games.SetGameStatus;

public class SetGameStatusCommand : IRequest<Game>
{
    public Game Game { get; set; } = null!;
}
