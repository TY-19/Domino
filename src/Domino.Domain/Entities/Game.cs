namespace Domino.Domain.Entities;

public class Game
{
    public DominoSet Set = null!;
    public Table Table = null!;
    public Player Player = null!;
    public Player Opponent = null!;
    public GameLog Log = null!;
}
