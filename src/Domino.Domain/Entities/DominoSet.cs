namespace Domino.Domain.Entities;

public class DominoSet
{
    private readonly List<DominoTile> Tiles;
    private readonly Random rnd;
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
                Tiles.Add(new DominoTile(i, j));
            }
        }
        Console.WriteLine(Tiles.Count);
    }
    public DominoTile? ServeTile()
    {
        if (Tiles.Count < 2)
        {
            return null;
        }
        int index = rnd.Next(Tiles.Count - 1);
        DominoTile toReturn = Tiles[index];
        Tiles.RemoveAt(index);
        return toReturn;
    }
}