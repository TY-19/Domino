using Domino.Domain.Entities;
using MediatR;

namespace Domino.Application.Queries.Games.GetCurrentGame;

public class GetCurrentGameRequest : IRequest<Game?>
{
    public string PlayerName { get; set; } = null!;
}
