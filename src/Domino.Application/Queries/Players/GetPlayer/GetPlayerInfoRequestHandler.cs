using Domino.Application.Interfaces;
using Domino.Domain.Entities;
using MediatR;

namespace Domino.Application.Queries.Players.GetPlayer;

public class GetPlayerInfoRequestHandler : IRequestHandler<GetPlayerInfoRequest, PlayerInfo?>
{
    private readonly IPlayerRepository _playerRepository;
    public GetPlayerInfoRequestHandler(IPlayerRepository playerRepository)
    {
        _playerRepository = playerRepository;
    }
    public async Task<PlayerInfo?> Handle(GetPlayerInfoRequest request, CancellationToken cancellationToken)
    {
        return await _playerRepository.GetPlayerInfoAsync(request.PlayerName);
    }
}
