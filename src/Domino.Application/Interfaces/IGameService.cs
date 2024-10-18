using Domino.Application.Models;
using Domino.Domain.Entities;

namespace Domino.Application.Interfaces;

public interface IGameService
{
    Task<GameView?> GetCurrentGameAsync(string playerName);
    Task<GameView> StartGameAsync(string playerName, string opponentName);
    Task<GameView> PlayTileAsync(string playerName, PlayTileDto playTileDto);
    Task<GameView> GrabTileAsync(string playerName);
    Task<GameView> WaitOpponentTurnAsync(string playerName);
}
