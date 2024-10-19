using FluentValidation;

namespace Domino.Application.Commands.Games.PlayTile;

public class PlayTileCommandValidator : AbstractValidator<PlayTileCommand>
{
    public PlayTileCommandValidator()
    {
        RuleFor(x => x.Game).NotNull();
        RuleFor(x => x.PlayTileDto).NotNull();
    }
}
