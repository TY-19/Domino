using Domino.Domain.Entities;

namespace Domino.Application.Exceptions;

public class GameException : Exception
{
    public Game Game { get; set; } = null!;
    public GameException()
    {
        
    }
    public GameException(Game game) : this(game, "")
    {
        
    }
    public GameException(Game game, string message) : base(message)
    {
        Game = game;
    }
}
