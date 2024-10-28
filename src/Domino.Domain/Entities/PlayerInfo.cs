using Domino.Domain.Enums;

namespace Domino.Domain.Entities;

public class PlayerInfo
{
    private PlayerType _type = PlayerType.Undefined;
    public string PlayerName { get; set; } = null!;
    public PlayerType Type
    {
        get
        {
            if(_type == PlayerType.Undefined)
            {
                return Coefficients == null ? PlayerType.Human : PlayerType.AI;
            }
            return _type;
        }
        set => _type = value;
    }
    public int CurrentPointCount { get; set; }
    public StrategyCoefficients? Coefficients { get; set; }
    public PlayerInfo()
    {
        
    }
    public PlayerInfo(string playerName)
    {
        PlayerName = playerName;
    }
    public PlayerInfo(string playerName, StrategyCoefficients coefficients) : this(playerName)
    {
        Coefficients = coefficients;
    }
}
