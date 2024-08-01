namespace Domino.Domain.Entities;

public class AiPlayer : Player
{
    public AiPlayer()
    {
        
    }
    public AiPlayer(string name) : base(name)
    {
        
    }

    public Move MakeMove(Table table)
    {
        var (left, right) = table.GetFreeEnds();
        var possibilities = _hand.Where(t => t.A == left || t.A == right
            || t.B == left || t.B == right).ToList();
        if (possibilities.Count == 0)
        {
            return new GrabTileMove();
        }
        else if (possibilities.Count == 1)
        {
            return new PlayTileMove(possibilities[0]);
        }
        else
        {
            // Rework to apply different strategies
            var rnd = new Random();
            return new PlayTileMove(possibilities[rnd.Next(possibilities.Count -1)]);
        }
    }
}
