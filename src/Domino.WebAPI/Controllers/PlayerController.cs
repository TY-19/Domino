using Domino.Application.Interfaces;
using Domino.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Domino.WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PlayersController : ControllerBase
{
    private readonly IPlayerService _playerStatisticService;
    public PlayersController(IPlayerService playerStatisticService)
    {
        _playerStatisticService = playerStatisticService;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<PlayerInfo>>> GetPlayersInfo()
    {
        return Ok(await _playerStatisticService.GetAllPlayersInfoAsync());
    }
    [HttpGet("statistics")]
    public async Task<ActionResult<IEnumerable<PlayerStatistic>>> GetPlayersStatistics()
    {
        return Ok(await _playerStatisticService.GetAllPlayersStatisticsAsync());
    }
    [HttpGet("statistics/{playerName}")]
    public async Task<ActionResult<PlayerStatistic>> GetPlayerStatistics(string playerName)
    {
        return Ok(await _playerStatisticService.GetPlayerStatisticsAsync(playerName));
    }
    [HttpDelete("statistics/all")]
    public async Task<ActionResult> DeleteAllStatistics()
    {
        await _playerStatisticService.DeleteAllStatistic();
        return NoContent();
    }
}
