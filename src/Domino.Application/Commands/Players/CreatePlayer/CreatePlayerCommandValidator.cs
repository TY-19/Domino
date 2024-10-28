using System.Data;
using FluentValidation;

namespace Domino.Application.Commands.Players.CreatePlayer;

public class CreatePlayerCommandValidator : AbstractValidator<CreatePlayerCommand>
{
    public CreatePlayerCommandValidator()
    {
        RuleFor(x => x.PlayerName).NotEmpty();
    }
}
