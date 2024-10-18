using Domino.Domain.Entities;
using MediatR;
using Microsoft.Extensions.Caching.Memory;

namespace Domino.Application.Queries.Games.GetCurrentGame;

public class GetCurrentGameRequestHandler : IRequestHandler<GetCurrentGameRequest, Game?>
{
    private readonly IMemoryCache _cache;
    public GetCurrentGameRequestHandler(IMemoryCache cahce)
    {
        _cache = cahce;
    }
    public Task<Game?> Handle(GetCurrentGameRequest request, CancellationToken cancellationToken)
    {
        _cache.TryGetValue(request.PlayerName, out Game? game);
        return Task.FromResult(game);
    }
}
