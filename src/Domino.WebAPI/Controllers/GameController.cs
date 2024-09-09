using Domino.Application.Interfaces;
using Domino.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Domino.WebAPI.Controllers;

[Route("api/[controller]")]
public class GameController(IGameService gameService) : ControllerBase
{
    IGameService _gameService = gameService;
    [HttpGet("start")]
    public ActionResult<Game> StartGame(string playerName, string opponentName = "AI")
    {
        return _gameService.StartGame(playerName, opponentName);
    }
    [HttpGet("play")]
    public ActionResult<Game> PlayTile(string tileId, string? nextTo = null)
    {
        return _gameService.PlayTile(tileId, nextTo);
    }
    [HttpGet("grab")]
    public ActionResult<Game> GrabTile()
    {
        return _gameService.GrabTile();
    }
    [HttpGet("endTurn")]
    public ActionResult<Game> EndTurn()
    {
        return _gameService.WaitOpponentTurn();
    }
}
