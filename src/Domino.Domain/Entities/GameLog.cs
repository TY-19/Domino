namespace Domino.Domain.Entities;

public class GameLog
{
    private List<GameLogEntry> _entries = [];
    public List<GameLogEntry> Events { get => _entries; }
    public List<GameLogEntry> GetLog()
    {
        return _entries;
    }
    public void AddEntry(GameLogEntry entry)
    {
        entry.MoveNumber = _entries.Count + 1;
        _entries.Add(entry);
    }
}
