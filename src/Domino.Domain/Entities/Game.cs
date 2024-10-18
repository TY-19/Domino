namespace Domino.Domain.Entities;

public class Game
{
    public long Id { get; set; }
    public DominoSet Set { get; }
    public Table Table { get; }
    public Player Player { get; }
    public Player Opponent { get; }
    public GameLog Log { get; }
    public GameRules GameRules { get; }
    public GameStatus GameStatus { get; }
    public GameError? GameError { get; set; }
    public bool IsOpponentTurn { get; set; }
    public Game(long id, string playerName = "Player", string opponentName = "AI")
    {
        Id = id;
        Set = new();
        Table = new();
        Log = new();
        Player = new HumanPlayer(playerName);
        Opponent = new AiPlayer(opponentName);
        GameRules = new(new GameRulesPrototype());
        GameStatus = new();
    }
    public Game(long id, PlayerInfo player, PlayerInfo opponent)
    {
        Id = id;
        Set = new();
        Table = new();
        Log = new();
        Player = new HumanPlayer(player);
        Opponent = new AiPlayer(opponent);
        GameRules = new(new GameRulesPrototype());
        GameStatus = new();
    }
}
