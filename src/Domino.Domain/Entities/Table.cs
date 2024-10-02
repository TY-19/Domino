namespace Domino.Domain.Entities;

public class Table
{
    public LinkedList<DominoTile> TilesOnTable { get; } = new();
    public DominoTile PlaceTile(TileDetails tileDetails, int contactEdge, int position)
    {
        if(position == 0 && TilesOnTable.Count != 0)
        {
            throw new ArgumentException("Starting tile is already in place.");
        }
        var tile = new DominoTile()
        {
            TileDetails = tileDetails,
            ContactEdge = contactEdge,
            Position = position,
        };
        if(tile.Position <= 0)
        {
            TilesOnTable.AddFirst(tile);
        }
        else
        {
            TilesOnTable.AddLast(tile);
        }
        return tile;
    }
    public (DominoTile? left, DominoTile? right) GetFreeEnds()
    {
        return (TilesOnTable.First?.Value, TilesOnTable.Last?.Value);
    }
    public List<(TileDetails tileDetails, int edge)> GetPossibleMoves(List<TileDetails> hand)
    {
        List<(TileDetails tileDetails, int edge)> possibleMoves = [];
        if(TilesOnTable.Count == 0)
        {
            var doubles = hand.Where(d => d.IsDouble);
            if(!doubles.Any())
            {
                doubles = hand;
            }
            foreach(var tile in doubles)
            {
                possibleMoves.Add((tile, tile.SideA));
            }
        }
        var (left, right) = GetFreeEnds();
        foreach(var tile in hand)
        {
            if(tile.SideA == left?.FreeEnd)
            {
                possibleMoves.Add((tile, tile.SideA));
            }
            if(tile.SideA != tile.SideB && tile.SideB == left?.FreeEnd)
            {
                possibleMoves.Add((tile, tile.SideB));
            }
            if(left?.FreeEnd != right?.FreeEnd)
            {
                if(tile.SideA == right?.FreeEnd)
                {
                    possibleMoves.Add((tile, tile.SideA));
                }
                if(tile.SideA != tile.SideB && tile.SideB == right?.FreeEnd)
                {
                    possibleMoves.Add((tile, tile.SideB));
                }   
            }
        }
        return possibleMoves;
    }
    public int? TryGetPosition(TileDetails tileDetails, int contactEdge, bool? isLeft)
    {
        if(tileDetails.SideA != contactEdge && tileDetails.SideB != contactEdge)
        {
            return null;
        }
        var (left, right) = GetFreeEnds();
        if(left == null && right == null)
        {
            return 0;
        }
        if(contactEdge != left?.FreeEnd && contactEdge != right?.FreeEnd)
        {
            return null;
        }
        if((!isLeft.HasValue || isLeft.Value) && contactEdge == left?.FreeEnd)
        {
            return left.Position - 1;
        }
        if((!isLeft.HasValue || !isLeft.Value) && contactEdge == right?.FreeEnd)
        {
            return right.Position + 1;
        }
        return null;
    }
}
