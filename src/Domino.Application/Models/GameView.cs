using Domino.Domain.Entities;

namespace Domino.Application.Models;

public class GameView
{
    public long Id { get; set; }
    public GameError? Error { get; set; }
    public Table Table { get; set; } = null!;
    public PlayerGameView Player { get; set; } = null!;
    public PlayerGameView Opponent { get; set; } = null!;
    public int MarketTilesCount { get; set; }
    public GameRules GameRules { get; set; } = null!;
    public GameStatus GameStatus { get; set; } = null!;
    public GameResult? GameResult { get; set; }
    public GameLog Log { get; set; } = null!;
}