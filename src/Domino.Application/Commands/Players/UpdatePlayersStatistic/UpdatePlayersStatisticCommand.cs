using Domino.Domain.Entities;
using MediatR;

namespace Domino.Application.Commands.Players.UpdatePlayersStatistic;

public class UpdatePlayersStatisticCommand : IRequest
{
    public Game Game { get; set; } = null!;
}
