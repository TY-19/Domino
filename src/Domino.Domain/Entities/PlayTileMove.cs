using Domino.Domain.Enums;

namespace Domino.Domain.Entities;

public class PlayTileMove : Move
{
    public override MoveType Type { get => MoveType.PlayTile; }
    public TileDetails Tile { get; set;}
    public int ContactEdge { get; set; }
    public PlayTileMove(TileDetails tile, int contactEdge)
    {
        Tile = tile;
        ContactEdge = contactEdge;
    }
}
