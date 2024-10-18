using Domino.Application.Models;
using Domino.Domain.Entities;
using MediatR;

namespace Domino.Application.Commands.Games.PlayTile;

public class PlayTileCommand : IRequest<Game>
{
    public Game Game { get; set; } = null!;
    public PlayTileDto PlayTileDto { get; set; } = null!;
}
