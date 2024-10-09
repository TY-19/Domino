using Domino.Application.Models;
using Domino.Domain.Entities;

namespace Domino.Application.Interfaces;

public interface IAiStrategy
{
    Move SelectMove(GameView gameView);
}