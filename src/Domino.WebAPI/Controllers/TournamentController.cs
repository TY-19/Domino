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
    public async Task<ActionResult> CreateEngines(int count = 128)
    {
        await _tournamentService.CreateRandomEnginesAsync(count);
        return NoContent();
    }
    [HttpPost("playTournament")]
    public async Task<ActionResult<List<Engine>>> PlayTournament(IEnumerable<string> engineNames)
    {
        return Ok(await _tournamentService.PlayTournamentAsync(engineNames));
    }
}
