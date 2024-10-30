using Domino.Domain.Entities;
using FluentValidation;

namespace Domino.Application.Validators;

public class GameRulesValidator : AbstractValidator<GameRules>
{
    public GameRulesValidator()
    {
        RuleFor(x => x.MaxGrabsInRow)
            .InclusiveBetween(0, 28);
        RuleFor(x => x.MinLeftInMarket)
            .InclusiveBetween(0, 28);
        RuleFor(x => x.StarterTiles)
            .NotEmpty();
        RuleForEach(x => x.StarterTiles)
            .Must(IsValidTileId);
        RuleFor(x => x.HuntStarterTiles)
            .NotEmpty();
        RuleForEach(x => x.HuntStarterTiles)
            .Must(IsValidTileId);
        RuleFor(x => x.PointsToStartHunt)
            .GreaterThanOrEqualTo(0);
        RuleFor(x => x.TotalPointsToLoseWithGoat)
            .GreaterThanOrEqualTo(0);
        
    }
    private static bool IsValidTileId(string tileId)
    {
        var sides = tileId.Split("-");
        return sides.Length == 2
            && int.TryParse(sides[0], out int a)
            && int.TryParse(sides[1], out int b)
            && a >= 0 && a <= 6
            && b >= 0 && b <= 6;
    }
}
