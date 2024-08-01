using Domino.Domain.Enums;

namespace Domino.Domain.Entities;

public class GrabTileMove : Move
{
    public override MoveType Type { get => MoveType.GrabTile; }
}