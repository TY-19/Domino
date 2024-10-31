using Domino.Application.Helpers;
using Domino.Domain.Enums;

namespace Domino.Domain.Entities;

public class GameError
{
    private readonly static Dictionary<ErrorType, string> _messages = new()
    {
        { ErrorType.Undefined, "Unexpected error." },
        { ErrorType.CannotPlayTile, "Cannot play this tile." },
        { ErrorType.NoDoublePlayPossible, "No double play is possible" },
        { ErrorType.NoTileInHand, "No tile with such an id in the hand."},
        { ErrorType.NoPlaceForTile, "The tile can't be played on the table." },
        { ErrorType.TileCannotStartGame, "The tile {tileId} cannot start the game.\nCurrent rules define starter tiles in such an order:\n{starters}"},
        { ErrorType.TileCannotStartHunt, "The tile {tileId} cannot start the hunt.\nYou need to play {starters} and if you win it will counts as Goat Victory!\n"},
        { ErrorType.GameEnded, "The game has already ended." }
    };
    public ErrorType Type { get; set; }
    public string? Message { get; set; }
    public Dictionary<string, string> Data { get; set; } = [];
    public GameError()
    {
        Type = ErrorType.Undefined;
    }
    public GameError(ErrorType errorType, Dictionary<string, string>? data = null)
    {
        Type = errorType;
        Message = BuildResultMessage(errorType, data);
        if(data != null)
        {
            Data = data;
        }
    }
    private static string BuildResultMessage(ErrorType errorType, Dictionary<string, string>? data = null)
    {
        string template = _messages[errorType];
        if(string.IsNullOrEmpty(template))
        {
            return string.Empty;
        }
        if(data == null || data.Count == 0)
        {
            return template;
        }
        return MessageHelper.FillPlaceholders(template, data);
    }
}
