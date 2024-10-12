namespace Domino.Domain.Entities;

public class GameStatus
{
    public string GameType { get; set; } = "Normal";
    public string[] HuntPlayers = new string[2];
    public string Status { get; set; } = "In progress";
    public bool IsEnded { get; set; }
    public bool IsDraw { get => IsEnded && Winner == null; }
    public string? Result { get; set; }
    public string? Winner { get; set; }
    public string? Loser { get; set; }
    public (string, int)[] LoserPointsCount { get; set; } = new (string, int)[2];
    public Dictionary<string, List<TileDetails>> EndHands { get; set; } = new();
    public string? VictoryType { get; set; }
    public bool IsInStatistic { get; set; }
}
