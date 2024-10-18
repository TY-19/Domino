using Domino.Domain.Entities;
using MediatR;

namespace Domino.Application.Commands.Games.StartGame;

public class StartGameCommand : IRequest<Game>
{
    public string PlayerName { get; set; } = null!;
    public string OpponentName { get; set; } = null!;
}
