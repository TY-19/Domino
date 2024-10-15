using Domino.Application.Interfaces;
using Domino.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Domino.WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PlayersController : ControllerBase
{
    private readonly IPlayerStatisticService _playerStatisticService;
    public PlayersController(IPlayerStatisticService playerStatisticService)
    {
        _playerStatisticService = playerStatisticService;
    }
    [HttpGet]
    public IEnumerable<PlayerInfo> GetPlayersInfo()
    {
        return _playerStatisticService.GetAllPlayersInfo();
    }
    [HttpGet("statistics")]
    public IEnumerable<PlayerStatistic> GetPlayersStatistics()
    {
        return _playerStatisticService.GetAllPlayersStatistics();
    }
}
