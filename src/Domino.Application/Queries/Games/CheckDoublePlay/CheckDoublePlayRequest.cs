using Domino.Application.Models;
using Domino.Domain.Entities;
using MediatR;

namespace Domino.Application.Queries.Games.CheckDoublePlay;

public class CheckDoublePlayRequest : IRequest<bool>
{
    public string PlayerName { get; set; } = null!;
    public Game Game { get; set; } = null!;
    public PlayTileDto[] PlayTileDtos { get; set; } = [];
}
