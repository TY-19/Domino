using FluentValidation;

namespace Domino.Application.Commands.Players.UpdatePlayersStatistic;

public class UpdatePlayersStatisticCommandValidator : AbstractValidator<UpdatePlayersStatisticCommand>
{
    public UpdatePlayersStatisticCommandValidator()
    {
        RuleFor(x => x.Game).NotNull();
    }
}
