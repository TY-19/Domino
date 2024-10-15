using Domino.Application.Exceptions;
using Domino.Application.Interfaces;
using Domino.Application.Models;
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
    [HttpGet("getCurrent")]
    public ActionResult<GameView> GetCurrentGame()
    {
        var currentGame = _gameService.GetCurrentGame();
        return currentGame == null ? NotFound() : Ok(currentGame);
    }

    [HttpGet("start")]
    public ActionResult<GameView> StartGame(string playerName = "Test", string opponentName = "AI")
    {
        return _gameService.StartGame(playerName, opponentName);
    }
    [HttpPost("play")]
    public ActionResult<GameView> PlayTile(PlayTileDto playTileDto)
    {
        try
        {
            return Ok(_gameService.PlayTile(playTileDto.TileId, playTileDto.IsLeft));
        }
        catch(GameEndedException ex)
        {
            return Ok(ex.GameView);
        }
    }
    [HttpGet("grab")]
    public ActionResult<GameView> GrabTile()
    {
        try
        {
            return Ok(_gameService.GrabTile());
        }
        catch(GameEndedException ex)
        {
            return Ok(ex.GameView);
        }
    }
    [HttpGet("endTurn")]
    public ActionResult<GameView> EndTurn()
    {
        try
        {
            return Ok(_gameService.WaitOpponentTurn());
        }
        catch(GameEndedException ex)
        {
            return Ok(ex.GameView);
        }
    }
}
