using Domino.Domain.Enums;

namespace Domino.Domain.Entities;

public class AiPlayer : Player
{
    private StrategyCoefficients _coeffs = new();
    public StrategyCoefficients Coefficients { get => _coeffs; }
    public AiPlayer() : this("AI")
    {
        
    }
    public AiPlayer(string name) : base(name)
    {
        
    }
    public AiPlayer(PlayerInfo player) : base(player)
    {
        
    }
    public AiPlayer(string name, StrategyCoefficients coefficients)
    {
        Name = name;
        _coeffs = coefficients;
    }
    public AiPlayer(PlayerInfo player, StrategyCoefficients coefficients) : this(player)
    {
        _coeffs = coefficients;
    }
}
