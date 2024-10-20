using Domino.Application.Commands.Games.GrabTile;
using Domino.Application.Commands.Games.PlayTile;
using Domino.Application.Models;
using Domino.Domain.Entities;
using MediatR;

namespace Domino.Application.Commands.Games.MakeOpponentMove;

public class MakeOpponentMoveCommandHandler : IRequestHandler<MakeOpponentMoveCommand, Game>
{
    private readonly IMediator _mediator;
    public MakeOpponentMoveCommandHandler(IMediator mediator)
    {
        _mediator = mediator;
    }
    public async Task<Game> Handle(MakeOpponentMoveCommand command, CancellationToken cancellationToken)
    {
        var game = command.Game;
        switch (command.Move)
        {
            case PlayTileMove ptm:
                bool isLeft = ptm.ContactEdge == game.Table.LeftFreeEnd;
                var playTileDto = new PlayTileDto() { TileId = ptm.Tile.TileId, IsLeft = isLeft };
                game = await _mediator.Send(new PlayTileCommand() { Game = game, PlayTileDto = playTileDto });
                game.IsOpponentTurn = false;
                break;
            case GrabTileMove:
                game = await _mediator.Send(new GrabTileCommand() { Game = game });
                break;
            default:
                game.IsOpponentTurn = false;
                break;
        }
        return game;
    }
}
