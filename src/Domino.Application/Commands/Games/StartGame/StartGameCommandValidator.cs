using FluentValidation;

namespace Domino.Application.Commands.Games.StartGame;

public class StartGameCommandValidator : AbstractValidator<StartGameCommand>
{
    public StartGameCommandValidator()
    {
        RuleFor(x => x.PlayerName).NotEmpty();
        RuleFor(x => x.OpponentName).NotEmpty();
    }
}
