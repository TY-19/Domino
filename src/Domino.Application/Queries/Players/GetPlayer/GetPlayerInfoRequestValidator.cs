using FluentValidation;

namespace Domino.Application.Queries.Players.GetPlayer;

public class GetPlayerInfoRequestValidator : AbstractValidator<GetPlayerInfoRequest>
{
    public GetPlayerInfoRequestValidator()
    {
        RuleFor(x => x.PlayerName).NotEmpty();
    }
}
