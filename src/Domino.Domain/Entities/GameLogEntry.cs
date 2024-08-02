using Domino.Domain.Enums;

namespace Domino.Domain.Entities;

public class GameLogEntry
{
    public int MoveNumber { get; set; }
    public string PlayerName { get; set; } = "";
    public MoveType Type { get; set; }
    public DominoTile? Tile { get; set; }
}