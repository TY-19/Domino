using Domino.Application.Models;
using Domino.Domain.Entities;
using Domino.Domain.Enums;

namespace Domino.Application.Strategies;

public class AdvancedStrategy : StrategyBase
{
    private readonly float myHandCoeff = 2;
    private readonly float opponentHandCoeff = 1;
    private List<TileDetails> _myTiles = [];
    private List<TileDetails> _tableTiles = [];
    private List<TileDetails> _hiddenTiles = [];
    private List<TileDetails> _opponentHand = [];
    private List<TileDetails> _marketTiles = [];
    private List<int> _myEdges = [];
    private List<Weakness> _oppWeaknesses = [];
    private class Weakness
    {
        public int MoveNumber { get; set; }
        public int WeakSide { get; set; }
    }
    protected override PlayTileMove SelectPlayTileMove(GameView gameView)
    {
        _myTiles = gameView.Player.Hand;
        _tableTiles = gameView.Table.TilesOnTable.Select(dt => dt.TileDetails).ToList();
        _hiddenTiles = new DominoSet().Tiles.Except(_myTiles).Except(_tableTiles).ToList();
        AnalyzeLog(gameView);
        Dictionary<int, float> weights = GetMovesWeights(gameView);
        int moveIndex = weights.MaxBy(x => x.Value).Key;
        return PossibleMoves[moveIndex];
    }
    private void AnalyzeLog(GameView gameView)
    {
        Table table = new(gameView.GameRules);
        foreach(var logEvent in gameView.Log.Events)
        {
            if(logEvent.Type == MoveType.PlayTile)
            {
                table.PlaceTile(logEvent.Tile!.TileDetails, logEvent.Tile!.Position);
                if(logEvent.PlayerName == gameView.Player.Name)
                {
                    _myEdges.Add(logEvent.Tile!.FreeEnd);
                }
                else
                {
                    _myEdges.Remove(logEvent.Tile!.ContactEdge);
                }
            }
            else if(logEvent.Type == MoveType.GrabTile)
            {
                if(logEvent.PlayerName == gameView.Player.Name)
                {
                    
                }
                else
                {
                    for(int i = _oppWeaknesses.Count; i >= 0; i--)
                    {
                        var grabMoves = gameView.Log.Events.Where(e => 
                            e.MoveNumber > _oppWeaknesses[i].MoveNumber
                            && e.MoveNumber < logEvent.MoveNumber
                            && logEvent.PlayerName == gameView.Opponent.Name
                            && logEvent.Type == MoveType.GrabTile);
                        foreach(var grabMove in grabMoves)
                        {
                            if(gameView.Log.Events.Any(e =>
                                e.MoveNumber == grabMove.MoveNumber + 1
                                && logEvent.PlayerName == gameView.Opponent.Name
                                && logEvent.Type != MoveType.PlayTile))
                            {
                                _oppWeaknesses.Remove(_oppWeaknesses[i]);
                            }
                        }
                    }
                    _marketTiles = [];
                    _marketTiles.AddRange(_hiddenTiles.Where(t => t.SideA == table.LeftFreeEnd
                        || t.SideA == table.RightFreeEnd
                        || t.SideB == table.LeftFreeEnd
                        || t.SideB == table.RightFreeEnd));
                    _oppWeaknesses.Add(new Weakness()
                    {
                        MoveNumber = logEvent.MoveNumber,
                        WeakSide = table.LeftFreeEnd ?? -2,
                    });
                    _oppWeaknesses.Add(new Weakness()
                    {
                        MoveNumber = logEvent.MoveNumber,
                        WeakSide = table.RightFreeEnd ?? -2,
                    });
                }
            }
        }
    }
    private Dictionary<int, float> GetMovesWeights(GameView gameView)
    {
        Dictionary<int, float> weights = [];
        for(int i = 0; i < PossibleMoves.Count; i++)
        {
            var tile = PossibleMoves[i].Tile;
            int endOne = gameView.Table.LeftFreeEnd ?? -1;
            int endTwo = gameView.Table.RightFreeEnd ?? -1;
            if(PossibleMoves[i].ContactEdge == endOne)
            {
                endOne = PossibleMoves[i].FreeEnd;
            }
            else
            {
                endTwo = PossibleMoves[i].FreeEnd;
            }
            int myHandWeight = CountMyHandWeight(tile, endOne, endTwo);
            int opponentHandWeight = CountOpponentHandWeight(endOne, endTwo);
            float opponentHiddenHandWeight = CountOpponentPossibleHandWeight(gameView.Opponent.TilesCount, endOne, endTwo);
            // Keep 0-0 to end with Officer
            // Don't keep doubles
            // Try to cut opponent double
            // Cut your own double not to left with 0-0 or 6-6
            // Play safe
            // Prevent opponent to reverse table to your weakness
            // Not beat your edge
            float weight = myHandWeight * myHandCoeff - opponentHandCoeff * (opponentHandWeight + opponentHiddenHandWeight);
            weights.Add(i, weight);
        }
        return weights;
    }
    private int CountMyHandWeight(TileDetails except, int endOne, int endTwo)
    {
        int counter = 0;
        foreach (var tile in _myTiles)
        {
            if(tile == except)
            {
                continue;
            }
            if(tile.SideA == endOne || tile.SideA == endTwo)
            {
                counter++;
            }
            if(!tile.IsDouble && tile.SideB == endOne || tile.SideB == endTwo)
            {
                counter++;
            }
        }
        return counter;
    }
    private int CountOpponentHandWeight(int endOne, int endTwo)
    {
        int counter = 0;
        foreach (var tile in _opponentHand)
        {
            if(tile.SideA == endOne || tile.SideA == endTwo)
            {
                counter++;
            }
            if(!tile.IsDouble && tile.SideB == endOne || tile.SideB == endTwo)
            {
                counter++;
            }
        }
        return counter;
    }
    private float CountOpponentPossibleHandWeight(int totalOpponentTiles, int endOne, int endTwo)
    {
        int opponentHiddenCount = totalOpponentTiles - _opponentHand.Count;
        int hiddenPossibleToPlay = 0;
        foreach (var tile in _hiddenTiles.Except(_marketTiles))
        {
            if(tile.SideA == endOne || tile.SideA == endTwo
                || tile.SideB == endOne || tile.SideB == endTwo)
            {
                hiddenPossibleToPlay++;
            }
        }
        float probableOpponentPlayableHiddenTiles = 0;
        for(int i = 1; i <= hiddenPossibleToPlay; i++)
        {
            // Ways to select opponent tiles out of all hidden tiles 
            float totalWays = Factorial(_hiddenTiles.Count)/(Factorial(opponentHiddenCount)*Factorial(_hiddenTiles.Count-opponentHiddenCount));
            // Ways to select i playable tiles out of all playable tiles
            float playableTilesWays = Factorial(hiddenPossibleToPlay)/(Factorial(i)*Factorial(hiddenPossibleToPlay - i));
            int hiddenNotPlayable = _hiddenTiles.Count - hiddenPossibleToPlay;
            int opponentNotPlayable = opponentHiddenCount - i;
            // Ways to select (hidden opponent tiles - i) non-playable tiles out of all non-playable tiles
            float p3 = opponentNotPlayable >= 0
                ? Factorial(hiddenNotPlayable)/(Factorial(opponentNotPlayable)*Factorial(hiddenNotPlayable - opponentNotPlayable))
                : 1;
            // Probability to select i playable tiles among all tiles into the opponent hand
            float probability = playableTilesWays * p3 / totalWays;
            probableOpponentPlayableHiddenTiles += i * probability;
        }
        return probableOpponentPlayableHiddenTiles;
    }
    private static int Factorial(int number)
    {
        if(number == 0)
        {
            return 1;
        }
        int result = 1;
        for(int i = 1; i <= number; i++)
        {
            result *= i;
        }
        return result;
    }
}
