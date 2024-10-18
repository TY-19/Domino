using Domino.Domain.Entities;
using MediatR;

namespace Domino.Application.Commands.Games.SaveGame;

public class SaveGameCommand : IRequest
{
    public Game Game { get; set; } = null!;
}
