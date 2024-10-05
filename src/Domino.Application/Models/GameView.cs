using Domino.Domain.Entities;

namespace Domino.Application.Models;

public class GameView
{
    public long Id { get; set; }
    public Table Table { get; set; } = null!;
    public string PlayerName { get; set; } = null!;
    public List<TileDetails> PlayerHand { get; set; } = null!;
    public string OpponentName { get; set; } = null!;
    public int OpponentTilesCount { get; set; }
    public int MarketTilesCount { get; set; }
    public GameStatus GameStatus { get; set; } = null!;
    public GameLog Log { get; set; } = null!;
    public List<(TileDetails tileDetails, int contactEdge)> PossibleTilesToPlay { get; set; } = [];
    
}