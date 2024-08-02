namespace Domino.Domain.Entities;

public class Player
{
    public string Name { get; }
    private protected List<DominoTile> _hand = [];
    public List<DominoTile> Hand { get => _hand; }
    public Player()
    {
        Name = "test";
    }
    public Player(string name)
    {
        Name = name;
    }
    public void GrabTile(DominoTile? tile)
    {
        if(tile == null)
        {
            return;
        }
        _hand.Add(tile);
    }
    public DominoTile? GetTileFromHand(string tileId)
    {
        return _hand.FirstOrDefault(t => t.TileId == tileId);
    }
    public void PlayTile(DominoTile tile)
    {
        if(tile == null)
        {
            return;
        }
        _hand.Remove(tile);
    }
}
