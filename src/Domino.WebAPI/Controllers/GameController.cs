using Domino.Application.Interfaces;
using Domino.Application.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Domino.WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GameController : ControllerBase
{
    private readonly IGameService _gameService;
    public GameController(IGameService gameService)
    {
        _gameService = gameService;
    }
    [HttpGet("current")]
    public async Task<ActionResult<GameView>> GetCurrentGame(string playerName)
    {
        var currentGame = await _gameService.GetCurrentGameAsync(playerName);
        return currentGame == null ? NotFound() : Ok(currentGame);
    }

    [HttpGet("start")]
    public async Task<ActionResult<GameView>> StartGame(string playerName = "Test", string opponentName = "AI")
    {
        return Ok(await _gameService.StartGameAsync(playerName, opponentName));
    }
    [HttpPost("play")]
    public async Task<ActionResult<GameView>> PlayTile(string playerName, PlayTileDto playTileDto)
    {
        return Ok(await _gameService.PlayTileAsync(playerName, playTileDto));
    }
    [HttpPost("doublePlay")]
    public async Task<ActionResult<GameView>> DoublePlay(string playerName, PlayTileDto[] playTileDtos)
    {
        return Ok(await _gameService.DoublePlayAsync(playerName, playTileDtos));
    }
    [HttpGet("grab")]
    public async Task<ActionResult<GameView>> GrabTile(string playerName)
    {
        return Ok(await _gameService.GrabTileAsync(playerName));
    }
    [HttpGet("endTurn")]
    public async Task<ActionResult<GameView>> EndTurn(string playerName)
    {
        return Ok(await _gameService.WaitOpponentTurnAsync(playerName));
    }
}
