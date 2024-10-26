namespace Domino.Domain.Entities;

public class GameRules
{
    public int MaxGrabsInRow { get; }
    public int MinLeftInMarket { get; }
    public string[] StarterTiles { get; }
    public string[] HuntStarterTiles { get; }
    public int PointsToStartHunt { get; }
    public bool WorkGoat { get; }
    public int TotalPointsToLoseWithGoat { get; }
    public GameRules(GameRulesPrototype prototype)
    {
        MaxGrabsInRow = prototype.MaxGrabsInRow;
        MinLeftInMarket = prototype.MinLeftInMarket;
        StarterTiles = prototype.StarterTiles;
        HuntStarterTiles = prototype.HuntStarterTiles;
        PointsToStartHunt = prototype.PointsToStartHunt;
        WorkGoat = prototype.WorkGoat;
        TotalPointsToLoseWithGoat = prototype.TotalPointsToLoseWithGoat;
    }   
}
public class GameRulesPrototype
{
    private int _maxGrabsInRow = 3;
    private int _minLeftInMarket = 1;
    private int _pointsToStartHunt = 25;
    private bool _workGoat = true;
    private int _totalPointsToLoseWithGoat = 125;
    private string[] _starterTiles = ["1-1", "2-2", "3-3", "4-4", "5-5", "6-6"];
    private string[] _huntStarterTiles = ["6-6"];
    public int MaxGrabsInRow
    {
        get => _maxGrabsInRow;
        set 
        {
            if(value >= 0 && value < 28)
            {
                _maxGrabsInRow = value;
            }
        }
    }
    public int MinLeftInMarket
    {
        get => _minLeftInMarket;
        set
        {
            if(value >= 0 && value < 28)
            {
                _minLeftInMarket = value;
            }
        }
    }
    public string[] StarterTiles
    {
        get => _starterTiles;
        set
        {
            List<string> newTiles = [];
            foreach(var tile in value)
            {
                var sides = tile.Split("-");
                if(sides.Length == 2
                    && int.TryParse(sides[0], out int a)
                    && int.TryParse(sides[1], out int b)
                    && a >= 0 && a <= 6
                    && b >= 0 && b <= 6)
                {
                    newTiles.Add(tile);
                }
            }
            if(newTiles.Count > 0)
            {
                _starterTiles = [.. newTiles];
            }
        }
    }
    public string[] HuntStarterTiles
    {
        get => _huntStarterTiles;
        set
        {
            List<string> newTiles = [];
            foreach(var tile in value)
            {
                var sides = tile.Split("-");
                if(sides.Length == 2
                    && int.TryParse(sides[0], out int a)
                    && int.TryParse(sides[1], out int b)
                    && a >= 0 && a <= 6
                    && b >= 0 && b <= 6)
                {
                    newTiles.Add(tile);
                }
            }
            if(newTiles.Count > 0)
            {
                _huntStarterTiles = [.. newTiles];
            }
        }
    }
    public int PointsToStartHunt
    {
        get => _pointsToStartHunt;
        set
        {
            if(_pointsToStartHunt > 0 || _pointsToStartHunt <= 168)
                _pointsToStartHunt = value;
        }
    }
    public int TotalPointsToLoseWithGoat
    {
        get => _totalPointsToLoseWithGoat;
        set
        {
            if(_pointsToStartHunt > 0)
                _pointsToStartHunt = value;
        }
    }
    public bool WorkGoat { get => _workGoat; set => _workGoat = value; }
}
