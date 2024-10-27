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
                await PlayTileAsync(game, ptm);
                break;
            case GrabTileMove:
                game = await _mediator.Send(new GrabTileCommand() { Game = game });
                break;
            case DoublePlayMove dpm:
                await DoublePlayAsync(game, dpm);
                break;
            default:
                game.IsOpponentTurn = false;
                break;
        }
        return game;
    }
    private async Task PlayTileAsync(Game game, PlayTileMove ptm)
    {
        bool isLeft = ptm.ContactEdge == game.Table.LeftFreeEnd;
        var playTileDto = new PlayTileDto() { TileId = ptm.Tile.TileId, IsLeft = isLeft };
        game = await _mediator.Send(new PlayTileCommand() { Game = game, PlayTileDto = playTileDto });
        // game.IsOpponentTurn = !game.IsOpponentTurn;
    }
    private async Task DoublePlayAsync(Game game, DoublePlayMove dpm)
    {
        var playTileDtoOne = new PlayTileDto()
        {
            TileId = dpm.TileOne.TileId,
            IsLeft = game.Table.LeftFreeEnd == dpm.TileOne.SideA
        };
        game = await _mediator.Send(new PlayTileCommand() { Game = game, PlayTileDto = playTileDtoOne });
        game.IsOpponentTurn = !game.IsOpponentTurn;
        PlayTileMove ptm = new(dpm.TileTwo, dpm.TileTwo.SideA);
        await PlayTileAsync(game, ptm);
    }
}
