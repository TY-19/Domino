namespace Domino.Domain.Entities;

public class GameRules
{
    public int MaxGrabsInRow { get; }
    public int  MinLeftInMarket { get; }
    public GameRules(GameRulesPrototype prototype)
    {
        MaxGrabsInRow = prototype.MaxGrabsInRow;
        MinLeftInMarket = prototype.MinLeftInMarket;
    }   
}
public class GameRulesPrototype
{
    private int _maxGrabsInRow = 3;
    private int _minLeftInMarket = 1;
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
}
