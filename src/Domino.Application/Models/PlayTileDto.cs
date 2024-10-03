namespace Domino.Application.Models;

public class PlayTileDto
{
    public string TileId { get; set; } = null!;
    public int ContactEdge { get; set; }
    public bool? IsLeft = null;
}
