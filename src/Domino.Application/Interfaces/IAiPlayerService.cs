using Domino.Application.Models;
using Domino.Domain.Entities;

namespace Domino.Application.Interfaces;

public interface IAiPlayerService
{
    Move MakeMove(GameView gameView);
}
