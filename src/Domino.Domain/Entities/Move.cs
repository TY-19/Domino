using Domino.Domain.Enums;

namespace Domino.Domain.Entities;

public class Move
{
    public virtual MoveType Type { get => MoveType.Undefined; }
}