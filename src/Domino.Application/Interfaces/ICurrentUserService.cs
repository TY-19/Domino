namespace Domino.Application.Interfaces;

public interface ICurrentUserService
{
    void SetCurrentGameId(long gameId);
    public long? GetCurrentGameId();
}