using FluentValidation;

namespace Domino.Application.Queries.Games.GetCurrentGame;

public class GetCurrentGameRequestValidator : AbstractValidator<GetCurrentGameRequest>
{
    public GetCurrentGameRequestValidator()
    {
        RuleFor(x => x.PlayerName).NotEmpty();
    }
}
