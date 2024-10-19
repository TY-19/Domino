using System.Data;
using FluentValidation;

namespace Domino.Application.Commands.Games.MakeOpponentMove;

public class MakeOpponentMoveCommandValidator : AbstractValidator<MakeOpponentMoveCommand>
{
    public MakeOpponentMoveCommandValidator()
    {
        RuleFor(x => x.Game).NotNull();
        RuleFor(x => x.Move).NotNull();
    }
}
