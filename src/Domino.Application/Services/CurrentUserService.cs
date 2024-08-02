using Domino.Application.Interfaces;
using Domino.Domain.Constants;
using Microsoft.Extensions.Caching.Memory;

namespace Domino.Application.Services;

public class CurrentUserService : ICurrentUserService
{
    private readonly IMemoryCache _cache;

    public CurrentUserService(IMemoryCache memoryCache)
    {
        _cache = memoryCache;
    }
    public long? GetCurrentGameId()
    {
        _cache.TryGetValue(CacheKeys.CURRENT_GAME_ID, out long? gameId);
        return gameId;
    }
    public void SetCurrentGameId(long gameId)
    {
        _cache.Set(CacheKeys.CURRENT_GAME_ID, gameId);
    }
}
