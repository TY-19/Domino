using Domino.Domain.Entities;

namespace Domino.Application.Exceptions;

public class GameException : Exception
{
    public Game Game { get; set; } = null!;
}
