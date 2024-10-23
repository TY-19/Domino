using MediatR;

namespace Domino.Application.Queries.Games.CheckDoublePlay;

public class CheckDoublePlayRequestHandler : IRequestHandler<CheckDoublePlayRequest, bool>
{
    public Task<bool> Handle(CheckDoublePlayRequest request, CancellationToken cancellationToken)
    {
        if(request.PlayTileDtos.Length != 2)
        {
            return Task.FromResult(false);
        }
        var tile1 = request.Game.Player.GetTileFromHand(request.PlayTileDtos[0].TileId);
        var tile2 = request.Game.Player.GetTileFromHand(request.PlayTileDtos[1].TileId);
        int leftEnd = request.Game.Table.LeftFreeEnd ?? -1;
        int rightEnd = request.Game.Table.RightFreeEnd ?? -1;
        bool result = tile1 != null && tile1.IsDouble && tile2 != null && tile2.IsDouble
            && (tile1?.SideA == leftEnd && tile2?.SideA == rightEnd
                || tile1?.SideA == rightEnd && tile2?.SideA == leftEnd);
        return Task.FromResult(result);
    }
}
