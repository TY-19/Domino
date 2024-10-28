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
        Player previousPlayer = game.IsOpponentTurn ? game.Player : game.Opponent;
        if(CanGrabAnotherTile(game, currentPlayer, previousPlayer))
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
    public static bool CanGrabAnotherTile(Game game, Player currentPlayer, Player previousPlayer)
    {
        if(previousPlayer.GrabInRow >= game.GameRules.MaxGrabsInRow && 
            currentPlayer.GrabInRow == game.GameRules.MaxGrabsInRow)
        {
            previousPlayer.GrabInRow = 0;
        }
        return currentPlayer.GrabInRow < game.GameRules.MaxGrabsInRow
            && game.Set.TilesCount > game.GameRules.MinLeftInMarket;
    }
}
