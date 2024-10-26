namespace Domino.Domain.Enums;

public enum ErrorType
{
    Undefined = 0,
    CannotPlayTile = 101,
    NoDoublePlayPossible = 102,
    NoTileInHand = 103,
    NoPlaceForTile = 104,
    TileCannotStartGame = 105,
    TileCannotStartHunt = 106
}
