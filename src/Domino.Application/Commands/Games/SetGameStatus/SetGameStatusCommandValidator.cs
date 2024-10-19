using FluentValidation;

namespace Domino.Application.Commands.Games.SetGameStatus;

public class SetGameStatusCommandValidator : AbstractValidator<SetGameStatusCommand>
{
    public SetGameStatusCommandValidator()
    {
        RuleFor(x => x.Game).NotNull();
    }
}
