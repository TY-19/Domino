using FluentValidation;

namespace Domino.Application.Commands.Games.StartGame;

public class StartGameCommandValidator : AbstractValidator<StartGameCommand>
{
    public StartGameCommandValidator()
    {
        RuleFor(x => x.Player).NotNull();
        RuleFor(x => x.Opponent).NotNull();
    }
}
