using Domino.Domain.Entities;

namespace Domino.Application.Models;

public class GameView
{
    public long Id { get; set; }
    public string? ErrorMessage { get; set; }
    public Table Table { get; set; } = null!;
    public string PlayerName { get; set; } = null!;
    public int PlayerCurrentPoints { get; set; }
    public int PlayerGrabInRow { get; set; }
    public List<TileDetails> PlayerHand { get; set; } = null!;
    public string OpponentName { get; set; } = null!;
    public int OpponentCurrentPoints { get; set; }
    public int OpponentTilesCount { get; set; }
    public int OpponentGrabInRow { get; set; }
    public int MarketTilesCount { get; set; }
    public GameRules GameRules { get; set; } = null!;
    public GameStatus GameStatus { get; set; } = null!;
    public GameLog Log { get; set; } = null!;
}