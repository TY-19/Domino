using System.Text.RegularExpressions;

namespace Domino.Application.Helpers;

public partial class MessageHelper
{
    [GeneratedRegex(@"{(.*?)}")]
    private static partial Regex PlaceHolder();
    public static string FillPlaceholders(string template, Dictionary<string, string> data)
    {
        return PlaceHolder().Replace(template, match =>
        {
            string key = match.Groups[1].Value;
            return data.TryGetValue(key, out string? value) ? value : match.Value;
        });
    }
}
