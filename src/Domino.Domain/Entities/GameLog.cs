namespace Domino.Domain.Entities;

public class GameLog
{
    private int grabbed = 0;
    private List<GameLogEntry> _entries = [];
    public List<GameLogEntry> GetLog()
    {
        return _entries;
    }
    public void AddEntry(GameLogEntry entry)
    {
        var previous = _entries.Last();
        if(entry.PlayerName == previous.PlayerName && entry.Type == Enums.MoveType.GrabTile)
        {
            grabbed++;
        }
    }
    public bool CanGrabAnotherTile(string playerName)
    {
        var previous = _entries.Last();
        return previous.PlayerName == playerName && grabbed < 3;
    }
}
