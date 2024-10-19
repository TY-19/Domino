using FluentValidation;

namespace Domino.Application.Queries.Games.GetGame;

public class GetGameRequestValidator : AbstractValidator<GetGameRequest>
{
    public GetGameRequestValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
    }
}
