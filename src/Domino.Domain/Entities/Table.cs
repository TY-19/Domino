namespace Domino.Domain.Entities;

public class Table
{
    public LinkedList<DominoTile> TilesOnTable { get; } = new();
    public int? LeftPosition
    {
        get
        {
            return TilesOnTable.First?.Value.Position; 
        }
    }
    public int? LeftFreeEnd { get => GetFreeEnd(true); }
    public int? RightPosition
    {
        get
        {
            return TilesOnTable.Last?.Value.Position; 
        }
    }
    public int? RightFreeEnd { get => GetFreeEnd(false); }
    private int? GetFreeEnd(bool isLeft)
    {
        if(TilesOnTable.Count == 0)
        {
            return null;
        }
        if(isLeft && LeftPosition == 0)
        {
            return TilesOnTable.First?.Value.TileDetails.SideA;
        }
        if(!isLeft && RightPosition == 0)
        {
            return TilesOnTable.Last?.Value.TileDetails.SideB; 
        }
        return isLeft ? TilesOnTable.First?.Value.FreeEnd : TilesOnTable.Last?.Value.FreeEnd;
    }
    public DominoTile PlaceTile(TileDetails tileDetails, int position)
    {
        if(position == 0 && TilesOnTable.Count != 0)
        {
            throw new ArgumentException("Starting tile is already in place.");
        }
        int contactEdge = -1;
        if(position != 0)
        {
            contactEdge = position < 0 ? LeftFreeEnd!.Value : RightFreeEnd!.Value;
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
    public List<(TileDetails tileDetails, int edge)> GetPossibleMoves(List<TileDetails> hand)
    {
        List<(TileDetails tileDetails, int edge)> possibleMoves = [];
        if(TilesOnTable.Count == 0)
        {
            var doubles = hand.Where(d => d.IsDouble && d.TileId != "00");
            if(doubles.Any())
            {
                var precedence = new string[] {"11", "22", "33", "44", "55", "66"};
                TileDetails? starter;
                foreach(var adouble in precedence)
                {
                    starter = doubles.FirstOrDefault(d => d.TileId == adouble);
                    if(starter != null)
                    {
                        possibleMoves.Add((starter, starter.SideA));
                        return possibleMoves;
                    }
                }
            }
            else
            {
                doubles = hand;
                foreach(var tile in doubles)
                {
                    possibleMoves.Add((tile, tile.SideA));
                }
            }
            
            return possibleMoves;
        }
        foreach(var tile in hand)
        {
            if(tile.SideA == LeftFreeEnd)
            {
                possibleMoves.Add((tile, tile.SideA));
            }
            else if(tile.SideB == LeftFreeEnd)
            {
                possibleMoves.Add((tile, tile.SideB));
            }
            if(LeftFreeEnd != RightFreeEnd)
            {
                if(tile.SideA == RightFreeEnd)
                {
                    possibleMoves.Add((tile, tile.SideA));
                }
                else if(tile.SideB == RightFreeEnd)
                {
                    possibleMoves.Add((tile, tile.SideB));
                }   
            }
        }
        return possibleMoves;
    }
    public int? TryGetPosition(TileDetails tileDetails, bool? isLeft)
    {
        if(LeftFreeEnd == null && RightFreeEnd == null)
        {
            return 0;
        }
        int? contactEdge = isLeft == null || isLeft == true
            ? LeftFreeEnd
            : RightFreeEnd;
        if(tileDetails.SideA != contactEdge && tileDetails.SideB != contactEdge)
        {
            return null;
        }
        return isLeft == null || isLeft == true
            ? LeftPosition - 1
            : RightPosition + 1;
    }
}
