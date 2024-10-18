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
        if(tileDetails == null) {
            string errorMessage = "No tile with such an id in the hand.";
            game.GameError = new() { ErrorMessage = errorMessage };
            return Task.FromResult(game);
        }   
        int? position = game.Table.TryGetPosition(tileDetails, command.PlayTileDto.IsLeft);
        if(position == null) {
            string errorMessage = "The tile can't be played on the table.";
            game.GameError = new() { ErrorMessage = errorMessage };
            return Task.FromResult(game);
        }
        _logger.LogInformation("Player plays {@details}", tileDetails);
        currentPlayer.PlayTile(tileDetails);
        var tile = game.Table.PlaceTile(tileDetails, position.Value);
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
}
