using FluentValidation;

namespace Domino.Application.Commands.Games.SaveGame;

public class SaveGameCommandValidator : AbstractValidator<SaveGameCommand>
{
    public SaveGameCommandValidator()
    {
        RuleFor(x => x.Game).NotNull();
    }
}
