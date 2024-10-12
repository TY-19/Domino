namespace Domino.Domain.Entities;

public class PlayerStatistic
{
    public string PlayerName { get; set; }
    public int GamesPlayed { get; set; }
    public int Wins { get; set; }
    public int NormalVictoryWins { get; set; }
    public int GoatWins { get; set; }
    public int OfficerWins { get; set; }
    public int GeneralWins { get; set; }
    public int WasHunter { get; set; }
    public int SuccessfulHunt { get; set; }
    public int WasHunted { get; set; }
    public int ClearedPoints { get; set; }
    public int Loses { get; set; }
    public int NormalVictoryLoses { get; set; }
    public int GoatLoses { get; set; }
    public int OfficerLoses { get; set; }
    public int GeneralLoses { get; set; }
    public int Draws { get; set; }
    public int TotalPointsLeftWith { get; set; }
    public PlayerStatistic(string playerName)
    {
        PlayerName = playerName;
    }
}
