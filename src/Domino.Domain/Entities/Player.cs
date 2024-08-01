namespace Domino.Domain.Entities;

public class Player
{
    public string Name { get; }
    private protected List<DominoTile> _hand = [];
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
        DominoTile? tile = _hand.FirstOrDefault(t => t.TileId == tileId);
        return tile;
    }
    public void PlayTile(DominoTile tile)
    {
        if(tile == null)
        {
            return;
        }
        _hand.Remove(tile);
    }
    public List<DominoTile> GetHand()
    {
        return _hand;
    }
}
