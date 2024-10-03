using Domino.Application.Interfaces;
using Domino.Application.Models;
using Domino.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Domino.WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GameController(IGameService gameService) : ControllerBase
{
    IGameService _gameService = gameService;
    [HttpGet("start")]
    public ActionResult<Game> StartGame(string playerName = "Test", string opponentName = "AI")
    {
        return _gameService.StartGame(playerName, opponentName);
    }
    [HttpPost("play")]
    public ActionResult<Game> PlayTile(PlayTileDto playTileDto)
    {
        return _gameService.PlayTile(playTileDto.TileId, playTileDto.ContactEdge, playTileDto.IsLeft);
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
