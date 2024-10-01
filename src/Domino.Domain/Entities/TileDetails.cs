namespace Domino.Domain.Entities;

public class TileDetails
{
    private int _a;
    private int _b;
    private string _tileId;
    public int SideA { get => _a; }
    public int SideB { get => _b; }
    public string TileId { get => _tileId; }
    public TileDetails(int a, int b)
    {
        if(a < 0 || a > 6 || b < 0 || b > 6)
        {
            throw new ArgumentException("Invalid domino");
        }
        _a = a;
        _b = b;
        _tileId = a <= b ? $"{_a}-{_b}" : $"{_b}-{_a}";
    }
    public bool IsDouble { get => _a == _b; }
    public bool IsMatch(int toMatch, out int freeEnd)
    {
        if (SideA == toMatch)
        {
            freeEnd = SideB;
            return true;
        }
        else if (SideB == toMatch)
        {
            freeEnd = SideA;
            return true;
        }
        else
        {
            freeEnd = -1;
            return false;
        }
    }
    public override string ToString()
    {
        return $"{_a}-{_b}";
    }
}