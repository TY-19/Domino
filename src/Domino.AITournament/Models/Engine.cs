using Domino.Domain.Entities;

namespace Domino.AITournament.Models;

public class Engine
{
    public string Name { get; set; }
    public StrategyCoefficients Coefficients { get; set; }
    public int GameNumber { get; set; }
    public Player Player { get; set; }
    public PlayerStatistic Statistic { get; set; }
    public Engine()
    {
        Name = "TestAI";
        Coefficients = new();
        Player = new();
        Statistic = new(Player.Name);
    }
    public Engine(string playerName, StrategyCoefficients coefficients)
    {
        Name = playerName;
        Player = new AiPlayer(playerName, coefficients);
        Coefficients = coefficients;
        Statistic = new PlayerStatistic(playerName);
    }
}
