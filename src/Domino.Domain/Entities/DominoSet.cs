namespace Domino.Domain.Entities;

public class DominoSet
{
    private readonly List<TileDetails> _tiles;
    private readonly Random _rnd;
    public List<TileDetails> Tiles { get => _tiles; }
    public int TilesCount { get => _tiles.Count; }
    public DominoSet()
    {
        _tiles = [];
        PopulateTiles();
        _rnd = new Random();
    }
    private void PopulateTiles()
    {
        for (int i = 0; i <= 6; i++)
        {
            for (int j = i; j <= 6; j++)
            {
                _tiles.Add(new TileDetails(i, j));
            }
        }
    }
    public TileDetails? ServeTile()
    {
        if (_tiles.Count < 2)
        {
            return null;
        }
        int index = _rnd.Next(_tiles.Count - 1);
        TileDetails toReturn = _tiles[index];
        _tiles.RemoveAt(index);
        return toReturn;
    }
    public TileDetails? LeaveStarterForHunter()
    {
        var starter = _tiles.Find(t => t.TileId == "6-6");
        if(starter != null)
        {
            _tiles.Remove(starter);
        }
        return starter;
    }
}