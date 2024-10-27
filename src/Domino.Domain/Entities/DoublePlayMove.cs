using Domino.Domain.Enums;

namespace Domino.Domain.Entities;

public class DoublePlayMove : Move
{
    public override MoveType Type { get => MoveType.DoublePlay; }
    public TileDetails TileOne { get; set;}
    public TileDetails TileTwo { get; set;}
    public DoublePlayMove(TileDetails tileOne, TileDetails tileTwo)
    {
        TileOne = tileOne;
        TileTwo = tileTwo;
    }
}