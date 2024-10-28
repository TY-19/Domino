using Domino.Application.Models;
using FluentValidation;

namespace Domino.Application.Validators;

public class PlayerCreateDtoValidator : AbstractValidator<PlayerCreateDto>
{
    public PlayerCreateDtoValidator()
    {
        RuleFor(x => x.PlayerName).NotEmpty();
    }
}
