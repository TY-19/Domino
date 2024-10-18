using Domino.Domain.Entities;
using Domino.Domain.Enums;
using MediatR;

namespace Domino.Application.Commands.Games.GrabTile;

public class GrabTileCommandHandler : IRequestHandler<GrabTileCommand, Game>
{
    public Task<Game> Handle(GrabTileCommand command, CancellationToken cancellationToken)
    {
        var game = command.Game;
        Player currentPlayer = game.IsOpponentTurn ? game.Opponent : game.Player;
        if(CanGrabAnotherTile(game, currentPlayer.Name))
        {
            var tile = game.Set.ServeTile();
            currentPlayer.GrabTile(tile);
            game.Log.AddEntry(new GameLogEntry()
            {
                PlayerName = currentPlayer.Name,
                Type = MoveType.GrabTile
            });
        }
        else
        {
            game.IsOpponentTurn = !game.IsOpponentTurn;
        }
        return Task.FromResult(game);
    }
    public static bool CanGrabAnotherTile(Game game, string playerName)
    {
        if(game.Set.TilesCount <= game.GameRules.MinLeftInMarket)
        {
            return false;
        }
        var log = game.Log;
        if(log.Events.Count == 0)
        {
            return true;
        }
        var previous = log.Events.DefaultIfEmpty().MaxBy(e => e?.MoveNumber);
        if(previous?.PlayerName != playerName)
        {
            return true;
        }
        int grabbed = 1;
        for(int i = previous.MoveNumber - 1; i >= 0; i--)
        {
            var logEvent = log.Events.Find(e => e.MoveNumber == i);
            if(logEvent?.PlayerName != playerName || logEvent.Type != MoveType.GrabTile)
            {
                return true;
            }
            else
            {
                grabbed++;
                if(grabbed >= game.GameRules.MaxGrabsInRow)
                {
                    return false;
                }
            }
        }
        return true;
    }
}
