namespace Domino.Domain.Entities;

public class Player
{
    public string Name { get; }
    public PlayerInfo Info { get; set; }
    private protected List<TileDetails> _hand = [];
    public List<TileDetails> Hand { get => _hand; }
    public Player(): this("test")
    {

    }
    public Player(string name)
    {
        Name = name;
        Info = new() { PlayerName = name };
    }
    public void GrabTile(TileDetails? tileDetails)
    {
        if(tileDetails == null)
        {
            return;
        }
        _hand.Add(tileDetails);
    }
    public TileDetails? GetTileFromHand(string tileId)
    {
        return _hand.FirstOrDefault(t => t.TileId == tileId);
    }
    public void PlayTile(TileDetails tile)
    {
        if(tile == null)
        {
            return;
        }
        _hand.Remove(tile);
    }
}
