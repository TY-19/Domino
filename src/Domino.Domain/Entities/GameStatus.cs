using Domino.Domain.Enums;

namespace Domino.Domain.Entities;

public class GameStatus
{
    public GameType GameType { get; set; } = GameType.Normal;
    public string[] Hunters = new string[2];
    public string[] Hunted = new string[2];
    public bool IsHunter(string playerName)
    {
        return Hunters.Contains(playerName);
    }
    public bool IsHunted(string playerName)
    {
        return Hunted.Contains(playerName);
    }
}
