namespace Domino.Domain.Entities;

public class Table
{
    private int _leftEnd = -1;
    private int _rightEnd = -1;
    private LinkedListNode<DominoTile>? startNode;
    private LinkedList<DominoTile> _row = new();
    public LinkedList<DominoTile> TilesOnTable { get => _row; }
    public void PlaceTile(DominoTile toPlace, DominoTile? nextTo = null)
    {
        if (nextTo == null && startNode == null)
        {
            startNode = _row.AddFirst(toPlace);
            _leftEnd = toPlace.A;
            _rightEnd = toPlace.B;
        }
        else
        {
            if (toPlace.IsMatch(_rightEnd, out int freeEnd))
            {
                _row.AddLast(toPlace);
                _rightEnd = freeEnd;
            }
            else if (toPlace.IsMatch(_leftEnd, out freeEnd))
            {
                _row.AddFirst(toPlace);
                _leftEnd = freeEnd;
            }
        }
    }
    public (int left, int right) GetFreeEnds()
    {
        return (_leftEnd, _rightEnd);
    }
    public bool CanBePlayed(DominoTile tile)
    {
        return tile.A == _leftEnd || tile.A == _rightEnd
            || tile.B == _leftEnd || tile.B == _rightEnd
            || (_leftEnd == -1 && _rightEnd == -1);
    }
}
