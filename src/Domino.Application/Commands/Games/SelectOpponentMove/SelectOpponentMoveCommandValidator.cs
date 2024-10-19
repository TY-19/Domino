using FluentValidation;

namespace Domino.Application.Commands.Games.SelectOpponentMove;

public class SelectOpponentMoveCommandValidator : AbstractValidator<SelectOpponentMoveCommand>
{
    public SelectOpponentMoveCommandValidator()
    {
        RuleFor(x => x.Game).NotNull();
    }
}
