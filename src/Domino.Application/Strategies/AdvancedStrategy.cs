using Domino.Application.Models;
using Domino.Domain.Entities;
using Domino.Domain.Enums;

namespace Domino.Application.Strategies;

public class AdvancedStrategy : StrategyBase
{
    private StrategyCoefficients _strategyCoefficients;
    private List<TileDetails> _myTiles = [];
    private List<TileDetails> _tableTiles = [];
    private List<TileDetails> _hiddenTiles = [];
    private List<TileDetails> _opponentHand = [];
    private List<TileDetails> _marketTiles = [];
    private List<int> _myEdges = [];
    private List<int> _oppWeaknesses = [];
    public AdvancedStrategy()
    {
        _strategyCoefficients = new();
    }
    public AdvancedStrategy(StrategyCoefficients coefficients)
    {
        _strategyCoefficients = coefficients;
    }
    protected override PlayTileMove SelectPlayTileMove(GameView gameView)
    {
        _myTiles = gameView.Player.Hand;
        _tableTiles = gameView.Table.TilesOnTable.Select(dt => dt.TileDetails).ToList();
        _hiddenTiles = new DominoSet().Tiles.Except(_myTiles).Except(_tableTiles).ToList();
        AnalyzeLog(gameView);
        if(_marketTiles.Count >= _hiddenTiles.Count - gameView.Opponent.Hand.Count)
        {
            _opponentHand = _hiddenTiles.Except(_marketTiles).ToList();
        }
        Dictionary<int, double> weights = GetMovesWeights(gameView);
        int moveIndex = weights.MaxBy(x => x.Value).Key;
        return PossibleMoves[moveIndex];
    }
    private void AnalyzeLog(GameView gameView)
    {
        Table table = new(gameView.GameRules, gameView.GameStatus.GameType);
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
                    var next = gameView.Log.Events
                        .FirstOrDefault(e => e.MoveNumber == logEvent.MoveNumber + 1
                            && e.PlayerName == gameView.Opponent.Name);
                    if(next != null && next.Type == MoveType.GrabTile)
                    {
                        _oppWeaknesses = [];
                    }
                    _oppWeaknesses.Add(table.LeftFreeEnd ?? -2);
                    _oppWeaknesses.Add(table.RightFreeEnd ?? -2);
                    _marketTiles = [];
                    _marketTiles.AddRange(_hiddenTiles.Where(t => t.SideA == table.LeftFreeEnd
                        || t.SideA == table.RightFreeEnd
                        || t.SideB == table.LeftFreeEnd
                        || t.SideB == table.RightFreeEnd));
                }
            }
            _marketTiles = _marketTiles.Except(_marketTiles.Where(t =>
                _myTiles.Contains(t) || table.TilesOnTable.Select(td => td.TileDetails).Contains(t)))
                .ToList();
        }
    }
    private Dictionary<int, double> GetMovesWeights(GameView gameView)
    {
        Dictionary<int, double> weights = [];
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
            MoveWeight moveWeight = new()
            {
                MyHand = CountMyHandWeight(tile, endOne, endTwo),
                OpponentHand = CountOpponentHandWeight(endOne, endTwo),
                OpponentPossibleHand = CountOpponentPossibleHandWeight(gameView.Opponent.TilesCount, endOne, endTwo),
                LeaveOfficer = tile.IsOfficer ? -100 : 0,
                DontKeepDoubles = tile.IsDouble
                    ? gameView.Table.TilesOnTable.Select(td => td.TileDetails)
                        .Count(t => t.SideA == tile.SideA || t.SideB == tile.SideB)
                    : 0,
                CutOpponentDouble = CalculateCutOpponentTileWeight(gameView, i),
                PlaySafe = CalculatePlaySafeWeight(gameView, tile, endOne, endTwo),
                ProtectWeakness = CalculateProtectWeaknessWeight(tile, endOne, endTwo),
                NotBeatOwnEdge = _myEdges.Any(e => e == PossibleMoves[i].ContactEdge) ? -1 : 0,
                GetRidOfPoints = tile.SideA + tile.SideB
            };
            var weight = moveWeight.CalculateWeight(_strategyCoefficients);
            Serilog.Log.Information("Move {@m}", PossibleMoves[i]);
            Serilog.Log.Information("Weight {@cw}", moveWeight.SeeWeights(_strategyCoefficients));
            weights.Add(i, weight);
        }
        return weights;
    }
    private double CountMyHandWeight(TileDetails except, int endOne, int endTwo)
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
        return _myTiles.Count == 0
            ? 0
            : counter / (double)_myTiles.Count;
    }
    private double CountOpponentHandWeight(int endOne, int endTwo)
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
        return (double)_opponentHand.Count == 0
            ? 0
            : -counter / (double)_opponentHand.Count;
    }
    private double CountOpponentPossibleHandWeight(int totalOpponentTiles, int endOne, int endTwo)
    {
        int opponentHiddenCount = totalOpponentTiles - _opponentHand.Count;
        if(opponentHiddenCount == 0)
        {
            return 0;
        }
        int hiddenPossibleToPlay = 0;
        foreach (var tile in _hiddenTiles.Except(_marketTiles))
        {
            if(tile.SideA == endOne || tile.SideA == endTwo
                || tile.SideB == endOne || tile.SideB == endTwo)
            {
                hiddenPossibleToPlay++;
            }
        }
        double probableOpponentPlayableHiddenTiles = 0;
        for(int i = 1; i <= hiddenPossibleToPlay; i++)
        {
            // Ways to select opponent tiles out of all hidden tiles 
            double totalWays = Factorial(_hiddenTiles.Count)/(Factorial(opponentHiddenCount)*Factorial(_hiddenTiles.Count-opponentHiddenCount));
            // Ways to select i playable tiles out of all playable tiles
            double playableTilesWays = Factorial(hiddenPossibleToPlay)/(Factorial(i)*Factorial(hiddenPossibleToPlay - i));
            int hiddenNotPlayable = _hiddenTiles.Count - hiddenPossibleToPlay;
            int opponentNotPlayable = opponentHiddenCount - i;
            // Ways to select (hidden opponent tiles - i) non-playable tiles out of all non-playable tiles
            double p3 = opponentNotPlayable >= 0 && hiddenNotPlayable > opponentNotPlayable
                ? Factorial(hiddenNotPlayable)/(Factorial(opponentNotPlayable)*Factorial(hiddenNotPlayable - opponentNotPlayable))
                : 1;
            // Probability to select i playable tiles among all tiles into the opponent hand
            double probability = playableTilesWays * p3 / totalWays;
            probableOpponentPlayableHiddenTiles += i * probability;
        }
        return -probableOpponentPlayableHiddenTiles / opponentHiddenCount;
    }
    private static double Factorial(int n)
    {
        if (n < 0)
        {
            throw new ArgumentException("Factorial is not defined for negative numbers.");
        }
        if (n == 0)
        {
            return 1;
        }
        return n * Factorial(n - 1);
    }
    private double CalculateCutOpponentTileWeight(GameView gameView, int currentMove)
    {
        var leftEnd = gameView.Table.LeftFreeEnd ?? -1;
        var rightEnd = gameView.Table.RightFreeEnd ?? -1;
        if(leftEnd != rightEnd && _opponentHand.Any(t => t.IsDouble))
        {
            var opTileOne = _opponentHand.FirstOrDefault(t => t.IsDouble && t.SideA == leftEnd);
            var opTileTwo = _opponentHand.FirstOrDefault(t => t.IsDouble && t.SideA == rightEnd);
            if(opTileOne != null && PossibleMoves[currentMove].ContactEdge == leftEnd)
            {
                return gameView.Table.TilesOnTable.Select(td => td.TileDetails)
                    .Count(t => t.SideA == leftEnd || t.SideB == leftEnd);
            }
            else if(opTileTwo != null && PossibleMoves[currentMove].ContactEdge == rightEnd)
            {
                return gameView.Table.TilesOnTable.Select(td => td.TileDetails)
                    .Count(t => t.SideA == rightEnd || t.SideB == rightEnd);
            }
        }
        return 0;
    }
    private double CalculatePlaySafeWeight(GameView gameView, TileDetails except, int endOne, int endTwo)
    {
        double weight = 0.0;
        if(_myTiles.Except([except]).Any(t => t.SideA == endOne || t.SideB == endOne))
        {
            weight++;
        }
        if(_myTiles.Except([except]).Any(t => t.SideA == endTwo || t.SideB == endTwo))
        {
            weight++;
        }
        if(gameView.Opponent.TilesCount == 1)
        {
            if(_hiddenTiles.Any(t => t.IsOfficer) && (endOne == 0 || endTwo == 0))
            {
                weight -= 100;
            }
            if(_hiddenTiles.Any(t => t.TileId == "6-6") && (endOne == 6 || endTwo == 6))
            {
                weight -= 50;
            }
        }
        else if(gameView.Opponent.TilesCount == 2)
        {
            if(_hiddenTiles.Any(t => t.IsOfficer) && (endOne == 0 || endTwo == 0)
                && _hiddenTiles.Any(t => t.TileId == "6-6") && (endOne == 6 || endTwo == 6))
            {
                weight -= 200;
            }
        }
        return weight;
    }
    private double CalculateProtectWeaknessWeight(TileDetails except, int endOne, int endTwo)
    {
        return (!_myTiles.Except([except]).Any(t => t.SideA == endOne || t.SideB == endOne)
                || !_myTiles.Except([except]).Any(t => t.SideA == endTwo || t.SideB == endTwo))
            && _hiddenTiles.Any(t => t.SideA == endOne && t.SideB == endTwo
                    || t.SideA == endTwo && t.SideB == endTwo)
            ? 1
            : 0;
    }
}
