namespace Domino.Domain.Entities;

public class DominoTile
{
    private int _a;
    private int _b;
    private string _tileId;
    public int A { get => _a; }
    public int B { get => _b; }
    public string TileId { get => _tileId; }
    public DominoTile(int a, int b)
    {
        if(a < 0 || a > 6 || b < 0 || b > 6)
        {
            throw new ArgumentException("Invalid domino");
        }
        _a = a;
        _b = b;
        _tileId = $"{_a}{_b}";
    }
    public bool IsDouble { get => _a == _b; }
    public bool IsMatch(int toMatch, out int freeEnd)
    {
        if (A == toMatch)
        {
            freeEnd = B;
            return true;
        }
        else if (B == toMatch)
        {
            freeEnd = A;
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