namespace Domino.Domain.Entities;

public class DominoTile
{
    public TileDetails TileDetails { get; set; } = null!;
    public int Position { get; set; }
    public int ContactEdge { get; set; }
    public int FreeEnd
    {
        get => ContactEdge == TileDetails.SideA ? TileDetails.SideB : TileDetails.SideA;
    }
}
