using Domino.Application.Extensions;
using Domino.Domain.Entities;
using Domino.Domain.Enums;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Domino.Application.Commands.Games.PlayTile;

public class PlayTileCommandHandler : IRequestHandler<PlayTileCommand, Game>
{
    private readonly ILogger<PlayTileCommandHandler> _logger;
    public PlayTileCommandHandler(ILogger<PlayTileCommandHandler> logger)
    {
        _logger = logger;
    }
    public Task<Game> Handle(PlayTileCommand command, CancellationToken cancellationToken)
    {
        var game = command.Game;
        Player currentPlayer = game.IsOpponentTurn ? game.Opponent : game.Player;
        TileDetails? tileDetails = currentPlayer.GetTileFromHand(command.PlayTileDto.TileId);
        if(!TryGetPosition(tileDetails, command.PlayTileDto.IsLeft, game, out int? position)
            || tileDetails == null)
        {
            return Task.FromResult(game);
        }
        currentPlayer.PlayTile(tileDetails);
        var tile = game.Table.PlaceTile(tileDetails, position!.Value);
        _logger.LogInformation("Writing log");
        game.Log.AddEntry(new GameLogEntry()
        {
            PlayerName = currentPlayer.Name,
            Type = MoveType.PlayTile,
            Tile = tile,
        });
        game.IsOpponentTurn = !game.IsOpponentTurn;
        return Task.FromResult(game);
    }
    private bool TryGetPosition(TileDetails? tileDetails, bool? isLeft, Game game, out int? position)
    {
        position = null;
        if(tileDetails == null) {
            string errorMessage = "No tile with such an id in the hand.";
            game.GameError = new() { ErrorMessage = errorMessage };
            return false;
        }   
        position = game.Table.TryGetPosition(tileDetails, isLeft);
        if(position == null) {
            string errorMessage = "The tile can't be played on the table.";
            game.GameError = new() { ErrorMessage = errorMessage };
            return false;
        }
        if(position == 0)
        {
            var hand = game.IsOpponentTurn ? game.Opponent.Hand : game.Player.Hand;
            if(game.GameStatus.GameType == GameType.Normal)
            {
                var starters = game.Table.GetPossibleMoves(hand);
                if(starters.FirstOrDefault(s => s.Tile.TileId == tileDetails.TileId)?.Tile == null)
                {
                    string errorMessage = $"The tile {tileDetails.TileId} cannot start the game.\n"
                        + "Current rules define starter tiles in such and order:\n"
                        + game.GameRules.StarterTiles.Aggregate((t1, t2) => t1 + ", " + t2);
                    game.GameError = new() { ErrorMessage = errorMessage };
                    return false;
                }
            }
            else if(game.GameStatus.GameType == GameType.Hunt && tileDetails.TileId != "6-6")
            {
                string errorMessage = $"The tile {tileDetails.TileId} cannot start the hunt.\n"
                        + "You need to play 6-6 and if you win it will counts as Goat Victory!\n";
                game.GameError = new() { ErrorMessage = errorMessage };
                return false;
            }
        }
        return true;
    }
}
