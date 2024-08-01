using Domino.Domain.Enums;

namespace Domino.Domain.Entities;

public class PlayTileMove : Move
{
    public override MoveType Type { get => MoveType.PlayTile; }
    public DominoTile Tile;
    public PlayTileMove(DominoTile tile)
    {
        Tile = tile;
    }
}
