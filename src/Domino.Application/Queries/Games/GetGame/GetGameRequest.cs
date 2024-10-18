using Domino.Domain.Entities;
using MediatR;

namespace Domino.Application.Queries.Games;

public class GetGameRequest : IRequest<Game?>
{
    public long Id { get; set; }
}
