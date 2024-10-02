namespace Domino.Domain.Entities;

public class GameView
{
    public Table Table { get; set; } = null!;
    public List<TileDetails> MyHand = null!;
    public GameLog Log = null!;
    public GameStatus GameStatus = null!;
    public List<(TileDetails tileDetails, int contactEdge)> PossibleTilesToPlay = [];
    public GameView()
    {
        
    }
}