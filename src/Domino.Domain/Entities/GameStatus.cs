using Domino.Domain.Enums;

namespace Domino.Domain.Entities;

public class GameStatus
{
    public GameType GameType { get; set; } = GameType.Normal;
    public List<string> Hunters = [];
    public List<string> Hunted = [];
    public bool IsHunter(string playerName)
    {
        return Hunters.Contains(playerName);
    }
    public bool IsHunted(string playerName)
    {
        return Hunted.Contains(playerName);
    }
}
