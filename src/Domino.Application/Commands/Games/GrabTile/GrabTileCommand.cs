using Domino.Domain.Entities;
using MediatR;

namespace Domino.Application.Commands.Games.GrabTile;

public class GrabTileCommand : IRequest<Game>
{
    public Game Game { get; set; } = null!;
}
