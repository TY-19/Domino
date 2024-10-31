using Domino.AITournament.Models;
using Domino.AITournament.Services;
using Domino.Application.Models;
using Domino.Application.Strategies;
using Domino.Domain.Entities;
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
    [HttpGet("game/{id}")]
    public async Task<ActionResult<Game?>> GetGame(long id)
    {
        return Ok(await _tournamentService.GetGameByIdAsync(id));
    }
    [HttpGet("engines")]
    public async Task<ActionResult<List<Engine>>> GetEngines()
    {
        return Ok(await _tournamentService.GetEnginesAsync());
    }
    [HttpGet("engines/{name}")]
    public async Task<ActionResult<Engine>> GetEngine(string name)
    {
        return Ok(await _tournamentService.GetEngineAsync(name));
    }
    [HttpPost("engines")]
    public async Task<ActionResult> CreateEngines()
    {
        await _tournamentService.CreateEnginesAsync();
        return NoContent();
    }
    [HttpPost("tournament")]
    public async Task<ActionResult<List<Engine>>> PlayTournament()
    {
        return Ok(await _tournamentService.CreateTournamentAsync());
    }
    [HttpGet("playRealMatch")]
    public async Task<ActionResult<IEnumerable<Engine>>> PlayMatch(int numberGames, string one, string two)
    {
        return Ok(await _tournamentService.PlayMatchAsync(numberGames, one, two));
    }
    [HttpPost("playDefaultAI")]
    public async Task<ActionResult<IEnumerable<Engine>>> PlayDefaultAI(int numberGames = 50)
    {
        return Ok(await _tournamentService.PlayDefaultAITournamentAsync(numberGames));
    }
    [HttpGet("testplay")]
    public async Task<ActionResult<GameView?>> PlayTestMatch()
    {
        var engineOne = new Engine("test_tournament_1", new StrategyCoefficients());
        var engineTwo = new Engine("test_tournament_2", new StrategyCoefficients());
        var game = await _tournamentService.PlayMatchAsync(engineOne, engineTwo);
        return Ok(game);
    }
    [HttpGet("testmatch")]
    public async Task<ActionResult<List<Engine>>> PlayTest()
    {
        return Ok(await _tournamentService.TestPlayMatch());
    }
}
