using Domino.Domain.Entities;
using MediatR;

namespace Domino.Application.Commands.Players.CreatePlayer;

public class CreatePlayerCommand : IRequest<Player>
{
    public string PlayerName { get; set; } = null!;
    public bool IsAI { get; set; }
    public StrategyCoefficients? Coefficients { get; set; }
}
