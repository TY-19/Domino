using Domino.Application.Interfaces;
using Domino.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Domino.WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PlayerController : ControllerBase
{
    private readonly IPlayerStatisticService _playerStatisticService;
    public PlayerController(IPlayerStatisticService playerStatisticService)
    {
        _playerStatisticService = playerStatisticService;
    }
    [HttpGet("players")]
    public IEnumerable<PlayerStatistic> GetPlayersStatistics()
    {
        return _playerStatisticService.GetAllPlayersStatistics();
    }
}
