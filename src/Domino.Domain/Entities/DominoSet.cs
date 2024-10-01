namespace Domino.Domain.Entities;

public class DominoSet
{
    private readonly List<TileDetails> Tiles;
    private readonly Random rnd;
    public int TilesCount { get => Tiles.Count; }
    public DominoSet()
    {
        Tiles = [];
        PopulateTiles();
        rnd = new Random();
    }
    private void PopulateTiles()
    {
        for (int i = 0; i <= 6; i++)
        {
            for (int j = i; j <= 6; j++)
            {
                Tiles.Add(new TileDetails(i, j));
            }
        }
    }
    public TileDetails? ServeTile()
    {
        if (Tiles.Count < 2)
        {
            return null;
        }
        int index = rnd.Next(Tiles.Count - 1);
        TileDetails toReturn = Tiles[index];
        Tiles.RemoveAt(index);
        return toReturn;
    }
}