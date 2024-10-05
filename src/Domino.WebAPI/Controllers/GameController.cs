using Domino.Application.Interfaces;
using Domino.Application.Models;
using Microsoft.AspNetCore.Mvc;

namespace Domino.WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GameController(IGameService gameService) : ControllerBase
{
    IGameService _gameService = gameService;
    [HttpGet("start")]
    public ActionResult<GameView> StartGame(string playerName = "Test", string opponentName = "AI")
    {
        return _gameService.StartGame(playerName, opponentName);
    }
    [HttpPost("play")]
    public ActionResult<GameView> PlayTile(PlayTileDto playTileDto)
    {
        return _gameService.PlayTile(playTileDto.TileId, playTileDto.IsLeft);
    }
    [HttpGet("grab")]
    public ActionResult<GameView> GrabTile()
    {
        return _gameService.GrabTile();
    }
    [HttpGet("endTurn")]
    public ActionResult<GameView> EndTurn()
    {
        return _gameService.WaitOpponentTurn();
    }
}
