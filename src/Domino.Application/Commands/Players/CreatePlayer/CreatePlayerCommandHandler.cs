using Domino.Application.Interfaces;
using Domino.Application.Queries.Players.GetPlayer;
using Domino.Application.Strategies;
using Domino.Domain.Entities;
using MediatR;

namespace Domino.Application.Commands.Players.CreatePlayer;

public class CreatePlayerCommandHandler : IRequestHandler<CreatePlayerCommand, Player>
{
    private readonly IPlayerRepository _playerRepository;
    private readonly IMediator _mediator;
    public CreatePlayerCommandHandler(
        IPlayerRepository playerRepository,
        IMediator mediator)
    {
        _playerRepository = playerRepository;
        _mediator = mediator;
    }
    public async Task<Player> Handle(CreatePlayerCommand command, CancellationToken cancellationToken)
    {
        PlayerInfo? playerInfo = await _mediator.Send(new GetPlayerInfoRequest() { PlayerName = command.PlayerName}, cancellationToken);
        if(playerInfo == null)
        {
            playerInfo = new PlayerInfo(command.PlayerName);
            if(command.IsAI)
            {
                playerInfo.Coefficients = command.Coefficients ?? new DefaultCoefficients().GetOneOfDefaultCoefficients();
            }
            await _playerRepository.UpdatePlayerInfoAsync(playerInfo);
        }
        return command.IsAI ? new AiPlayer(playerInfo) : new Player(playerInfo);
    }
}
