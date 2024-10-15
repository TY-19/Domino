using Domino.Application.Extensions;
using Domino.Application.Models;
using Domino.Domain.Entities;

namespace Domino.Application.Exceptions;

public class GameEndedException : Exception
{
    public GameView GameView { get; set; }
    public GameEndedException(Game game, string playerName)
    {
        string errorMessage = "Game is ended";
        GameView = game.ToGameView(playerName, errorMessage);
    }
}
