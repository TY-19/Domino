using Domino.Application.Interfaces;
using Domino.Domain.Entities;
using MediatR;

namespace Domino.Application.Queries.Games;

public class GetGameRequestHandler : IRequestHandler<GetGameRequest, Game?>
{
    private readonly IGameRepository _gameRepository;
    public GetGameRequestHandler(IGameRepository gameRepository)
    {
        _gameRepository = gameRepository;
    }
    public async Task<Game?> Handle(GetGameRequest request, CancellationToken cancellationToken)
    {
        return await _gameRepository.GetGameAsync(request.Id);
    }
}
