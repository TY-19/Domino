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
        game.Log.AddEntry(new GameLogEntry()
        {
            PlayerName = currentPlayer.Name,
            Type = MoveType.PlayTile,
            Tile = tile,
        });
        Player nextPlayer = game.IsOpponentTurn ? game.Player : game.Opponent;
        nextPlayer.GrabInRow = 0;
        game.IsOpponentTurn = !game.IsOpponentTurn;
        return Task.FromResult(game);
    }
    private static bool TryGetPosition(TileDetails? tileDetails, bool? isLeft, Game game, out int? position)
    {
        position = null;
        if(tileDetails == null) {
            game.GameError = new(ErrorType.NoTileInHand);
            return false;
        }   
        position = game.Table.TryGetPosition(tileDetails, isLeft);
        if(position == null) {
            game.GameError = new(ErrorType.NoPlaceForTile);
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
                    Dictionary<string, string> data = new()
                    {
                        { "tileId", tileDetails.TileId },
                        { "starters", game.GameRules.StarterTiles.Aggregate((t1, t2) => t1 + ", " + t2) }
                    };
                    game.GameError = new(ErrorType.TileCannotStartGame, data);
                    return false;
                }
            }
            else if(game.GameStatus.GameType == GameType.Hunt && tileDetails.TileId != "6-6")
            {
                Dictionary<string, string> data = new()
                    {
                        { "tileId", tileDetails.TileId },
                        { "starters", "6-6" }
                    };
                game.GameError = new(ErrorType.TileCannotStartGame, data);
                return false;
            }
        }
        return true;
    }
}
