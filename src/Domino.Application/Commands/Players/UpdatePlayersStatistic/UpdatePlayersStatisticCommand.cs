using Domino.Domain.Entities;
using MediatR;

namespace Domino.Application.Commands.Players.UpdatePlayersStatistic;

public class UpdatePlayersStatisticCommand : IRequest
{
    public GameStatus GameStatus { get; set; } = null!;
}
