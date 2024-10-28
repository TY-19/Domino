using Domino.Application.Commands.Players.CreatePlayer;
using Domino.Application.Interfaces;
using Domino.Application.Strategies;
using Domino.Domain.Entities;
using MediatR;

namespace Domino.Application.Services;

public class PlayerService : IPlayerService
{
    private readonly IPlayerRepository _repo;
    private readonly IMediator _mediator;
    public PlayerService(
        IPlayerRepository repo,
        IMediator mediator
        )
    {
        _repo = repo;
        _mediator = mediator;
    }
    public async Task<IEnumerable<PlayerInfo>> GetAllPlayersInfoAsync()
    {
        return await _repo.GetAllPlayersInfoAsync();
    }
    public async Task<PlayerInfo?> GetPlayerInfoAsync(string playerName)
    {
        return await _repo.GetPlayerInfoAsync(playerName);
    }
    public async Task SeedDefaultPlayers()
    {
        string[] names = [ "Alice", "Bob", "Charley", "Daniel", "Emma", "Frank", 
            "George", "Hugh", "Inga", "John", "Kathy", "Lucy", "Monica", "Nathan",
            "Owen", "Paul", "Richard", "Sam", "Terry", "Victor", "Walter"];
        var defaults = new DefaultCoefficients().Coefficients;
        for(int i = 0; i < defaults.Count; i++)
        {
            string name = i > names.Length
                ? names[i % names.Length] + "_" + (i / names.Length)
                : names[i];
            await CreatePlayerAsync(name, true, defaults[i]);
        }
    }
    public async Task<Player> CreatePlayerAsync(string playerName, bool isAi,
        StrategyCoefficients? coefficients)
    {
        var command = new CreatePlayerCommand()
        {
            PlayerName = playerName,
            IsAI = isAi,
            Coefficients = coefficients
        };
        return await _mediator.Send(command);
    }
    public async Task UpdatePlayerInfoAsync(PlayerInfo playerInfo)
    {
        await _repo.UpdatePlayerInfoAsync(playerInfo);
    }
    public async Task<IEnumerable<PlayerStatistic>> GetAllPlayersStatisticsAsync()
    {
        return await _repo.GetAllPlayersStatisticsAsync();
    }
    public async Task<PlayerStatistic> GetPlayerStatisticsAsync(string playerName)
    {
        var statistics = await _repo.GetPlayerStatisticsAsync(playerName);
        return statistics ?? new PlayerStatistic(playerName);
    }
    public async Task DeleteAllStatistic()
    {
        await _repo.DeleteAllStatistic();
    }
}
