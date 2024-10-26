using Domino.Application.Helpers;
using Domino.Domain.Enums;

namespace Domino.Domain.Entities;

public class GameResultDetails
{
    private static readonly Dictionary<VictoryType, string> _messages = new()
    {
        { VictoryType.Draw, "The game ended up in a draw.\nPoints count is:\n{player} - {playerPoints}\n{opponent} - {opponentPoints}"},
        { VictoryType.Normal, "{winner} win! Normal victory. \n{loser} is left with {pointsLeft} points." },
        { VictoryType.ClearedPoints, "{winner} win! Points cleared." },
        { VictoryType.Goat, "{winner} win! Goat!" },
        { VictoryType.Officer, "{winner} win! Officer!!!" },
        { VictoryType.General, "{winner} win! General!!!!!" },
    };
    public VictoryType VictoryType { get; set; }
    public string? Message { get; set; }
    public Dictionary<string, string> Data { get; set; } = [];
    public GameResultDetails(VictoryType type, Dictionary<string, string>? data = null)
    {
        VictoryType = type;
        Message = BuildResultMessage(type, data);
        if(data != null)
        {
            Data = data;
        }
         
    }
    private static string BuildResultMessage(VictoryType type, Dictionary<string, string>? data = null)
    {
        string template = _messages[type];
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
