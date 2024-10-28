using Domino.Domain.Entities;

namespace  Domino.Application.Models;

public class PlayerCreateDto
{
    public string PlayerName { get; set; } = null!;
    public bool IsAi { get; set; }
    public StrategyCoefficients? Coefficients { get; set; }
}