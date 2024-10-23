using FluentValidation;

namespace Domino.Application.Queries.Games.CheckDoublePlay;

public class CheckDoublePlayRequestValidator : AbstractValidator<CheckDoublePlayRequest>
{
    public CheckDoublePlayRequestValidator()
    {
        RuleFor(x => x.PlayerName).NotEmpty();
        RuleFor(x => x.Game).NotNull();
        RuleFor(x => x.PlayTileDtos).NotEmpty();
    }
}
