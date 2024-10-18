namespace Domino.Domain.Entities;

public class AiPlayer : Player
{
    public AiPlayer() : this("AI")
    {
        
    }
    public AiPlayer(string name) : base(name)
    {
        
    }
    public AiPlayer(PlayerInfo player) : base(player)
    {
        
    }
}
