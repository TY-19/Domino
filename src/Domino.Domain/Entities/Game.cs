using Domino.Domain.Enums;

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
    public GameResult? GameResult { get; private set; }
    public GameError? GameError { get; set; }
    public bool IsOpponentTurn { get; set; }
    private Game(long id)
    {
        Id = id;
        Set = new();
        GameRules = new(new GameRulesPrototype());
        Table = null!;
        Log = new();
        GameStatus = new();
        Player = null!;
        Opponent = null!;
    }
    public Game(long id, string playerName = "Player", string opponentName = "AI") : this(id)
    {
        Player = new HumanPlayer(playerName);
        Opponent = new AiPlayer(opponentName);
        SetGameType();
        Table = new(GameRules, GameStatus.GameType);
    }
    public Game(long id, PlayerInfo player, PlayerInfo opponent) : this(id)
    {
        Player = new HumanPlayer(player);
        Opponent = new AiPlayer(opponent);
        SetGameType();
        Table = new(GameRules, GameStatus.GameType);
    }
    private void SetGameType()
    {
        GameStatus.GameType = GameType.Normal;
        if(Player.Info.CurrentPointCount >= GameRules.PointsToStartHunt)
        {
            GameStatus.GameType = GameType.Hunt;
            GameStatus.Hunted.Add(Player.Name);
            GameStatus.Hunters.Add(Opponent.Name);
        }
        if(Opponent.Info.CurrentPointCount >= GameRules.PointsToStartHunt)
        {
            GameStatus.GameType = GameType.Hunt;
            GameStatus.Hunted.Add(Opponent.Name);
            GameStatus.Hunters.Add(Player.Name);
        }
    }
    public void TrySetResult()
    {
        if(CheckForEnd(out Player? winner))
        {
            GameResult = new GameResult(winner, this);
        }
    }
    private bool CheckForEnd(out Player? winner)
    {
        winner = null;
        if(Player.Hand.Count == 0)
        {
            winner = Player;
            return true;
        }
        if(Opponent.Hand.Count == 0)
        {
            winner = Opponent;
            return true;
        }
        if(CheckForDraw())
        {
            return true;
        }
        return false;
    }
    private bool CheckForDraw()
    {
        return (Set.TilesCount <= GameRules.MinLeftInMarket
            || Table.GetPossibleMoves(Set.Tiles).Count == 0)
            && Table.GetPossibleMoves(Player.Hand).Count == 0
            && Table.GetPossibleMoves(Opponent.Hand).Count == 0;
    }
}
