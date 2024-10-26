using Domino.Application.Exceptions;
using Domino.Application.Extensions;
using Microsoft.AspNetCore.Diagnostics;

namespace Domino.WebAPI.Common;

public class GameExceptionHandler : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        if(exception is GameException gameExc)
        {
            httpContext.Response.StatusCode = 200;
            await httpContext.Response.WriteAsJsonAsync(
                gameExc.Game.ToGameView(gameExc.Game.Player.Name),
                cancellationToken
            );
            return true;
        }
        else
        {
            return false;
        }
    }
}
