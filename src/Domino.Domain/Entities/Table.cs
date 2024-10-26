using Domino.Domain.Enums;

namespace Domino.Domain.Entities;

public class Table
{
    private readonly string[] _starters;
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
    public Table(GameRules gameRules, GameType gameType)
    {
        _starters = gameType == GameType.Hunt
            ? gameRules.HuntStarterTiles
            : gameRules.StarterTiles;
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
    public List<PlayTileMove> GetPossibleMoves(List<TileDetails> hand)
    {
        List<PlayTileMove> moves = [];
        if(TilesOnTable.Count == 0)
        {
            TileDetails? starter;
            foreach(var starterId in _starters)
            {
                starter = hand.FirstOrDefault(d => d.TileId == starterId);
                if(starter != null)
                {
                    moves.Add(new PlayTileMove(starter, starter.SideA));
                    return moves;
                }
            }            
            return moves;
        }
        foreach(var tile in hand)
        {
            if(tile.SideA == LeftFreeEnd)
            {
                moves.Add(new PlayTileMove(tile, tile.SideA));
            }
            else if(tile.SideB == LeftFreeEnd)
            {
                moves.Add(new PlayTileMove(tile, tile.SideB));
            }
            if(LeftFreeEnd != RightFreeEnd)
            {
                if(tile.SideA == RightFreeEnd)
                {
                    moves.Add(new PlayTileMove(tile, tile.SideA));
                }
                else if(tile.SideB == RightFreeEnd)
                {
                    moves.Add(new PlayTileMove(tile, tile.SideB));
                }   
            }
        }
        return moves;
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
