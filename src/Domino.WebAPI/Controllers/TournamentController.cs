using Domino.AITournament.Interfaces;
using Domino.AITournament.Models;
using Microsoft.AspNetCore.Mvc;

namespace Domino.WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TournamentController(
        ITournamentService tournamentService,
        IEngineService engineService
        ) : ControllerBase
{
    private readonly ITournamentService _tournamentService = tournamentService;
    private readonly IEngineService _engineService = engineService;
    [HttpGet("engines")]
    public async Task<ActionResult<List<Engine>>> GetEngines()
    {
        return Ok(await _engineService.GetEnginesAsync());
    }
    [HttpGet("engines/{name}")]
    public async Task<ActionResult<Engine>> GetEngine(string name)
    {
        return Ok(await _engineService.GetEngineAsync(name));
    }
    [HttpPost("engines")]
    public async Task<ActionResult> CreateEngines(int count = 128)
    {
        return Ok(await _engineService.CreateRandomEnginesAsync(count));
    }
    [HttpPost("playTournament")]
    public async Task<ActionResult<List<Engine>>> PlayTournament(IEnumerable<string> engineNames)
    {
        return Ok(await _tournamentService.PlayTournamentAsync(engineNames));
    }
}
