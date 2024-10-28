using Domino.Domain.Entities;
using MediatR;

namespace Domino.Application.Queries.Players.GetPlayer;

public class GetPlayerInfoRequest : IRequest<PlayerInfo?>
{
    public string PlayerName { get; set; } = null!;
}
