using Domino.AITournament.Models;
using Domino.AITournament.Services;
using Domino.Application.Models;
using Domino.Application.Strategies;
using Microsoft.AspNetCore.Mvc;

namespace Domino.WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TournamentController : ControllerBase
{
    private readonly TournamentService _tournamentService;
    public TournamentController(TournamentService tournamentService)
    {
        _tournamentService = tournamentService;
    }
    [HttpGet("engines")]
    public async Task<ActionResult<List<Engine>>> GetEngines()
    {
        return Ok(await _tournamentService.GetEnginesAsync());
    }
    [HttpPost("tournament")]
    public async Task<ActionResult<List<Engine>>> PlayTournament()
    {
        return Ok(await _tournamentService.CreateTournament());
    }
    [HttpGet("testplay")]
    public async Task<ActionResult<GameView?>> PlayMatch()
    {
        var engineOne = new Engine("test_tournament_1", new StrategyCoefficients());
        var engineTwo = new Engine("test_tournament_2", new StrategyCoefficients());
        var game = await _tournamentService.PlayMatchAsync(engineOne, engineTwo);
        return Ok(game);
    }
}
