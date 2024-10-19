using FluentValidation;

namespace Domino.Application.Commands.Games.GrabTile;

public class GrabTileCommandValidator : AbstractValidator<GrabTileCommand>
{
    public GrabTileCommandValidator()
    {
        RuleFor(x => x.Game).NotNull();
    }
}
