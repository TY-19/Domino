using Domino.Application.Interfaces;
using Domino.Application.Models;
using Domino.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Domino.WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PlayersController : ControllerBase
{
    private readonly IPlayerService _playerService;
    public PlayersController(IPlayerService playerService)
    {
        _playerService = playerService;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<PlayerInfo>>> GetPlayersInfo()
    {
        return Ok(await _playerService.GetAllPlayersInfoAsync());
    }
    [HttpPost]
    public async Task<ActionResult<Player>> CreatePlayer(PlayerCreateDto dto)
    {
        return Ok(await _playerService.CreatePlayerAsync(dto.PlayerName, dto.IsAi, dto.Coefficients));
    }
    [HttpPost("seedDefaults")]
    public async Task<ActionResult<Player>> SeedDefaultPlayers()
    {
        await _playerService.SeedDefaultPlayers();
        return NoContent();
    }
    [HttpGet("statistics")]
    public async Task<ActionResult<IEnumerable<PlayerStatistic>>> GetPlayersStatistics()
    {
        return Ok(await _playerService.GetAllPlayersStatisticsAsync());
    }
    [HttpGet("statistics/{playerName}")]
    public async Task<ActionResult<PlayerStatistic>> GetPlayerStatistics(string playerName)
    {
        return Ok(await _playerService.GetPlayerStatisticsAsync(playerName));
    }
    [HttpDelete("statistics/all")]
    public async Task<ActionResult> DeleteAllStatistics()
    {
        await _playerService.DeleteAllStatistic();
        return NoContent();
    }
}
