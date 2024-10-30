namespace Domino.Domain.Entities;

public class GameRules
{
    public int MaxGrabsInRow { get; set; }
    public int MinLeftInMarket { get; set; }
    public string[] StarterTiles { get; set; } = [];
    public string[] HuntStarterTiles { get; set; } = [];
    public int PointsToStartHunt { get; set; }
    public bool WorkGoat { get; set; }
    public int TotalPointsToLoseWithGoat { get; set; }
    public Dictionary<string, int> LastTilePoints { get; set; } = [];
    public Dictionary<string, int> MorePointToEndWith { get; set; } = [];
}
