using Domino.Domain.Entities;
using MediatR;

namespace Domino.Application.Commands.Games.StartGame;

public class StartGameCommand : IRequest<Game>
{
    public Player Player { get; set; } = null!;
    public Player Opponent { get; set; } = null!;
    public GameRules Rules { get; set; } = null!;
}
