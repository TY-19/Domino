using Domino.Application.Models;
using Domino.Domain.Entities;

namespace Domino.Application.Strategies;

public class AdvancedStrategy : StrategyBase
{
    private readonly decimal wageForMeCoeff = 1;
    private readonly decimal wageAgainstOppCoeff = 1;
    private List<TileDetails> HiddenTiles { get; set; } = new();
    private List<TileDetails> OpponentHand { get; set; } = new();
    private List<TileDetails> MarketTiles { get; set; } = new();
    protected override PlayTileMove SelectPlayTileMove(GameView gameView)
    {
        var set = new DominoSet();
        HiddenTiles = set.Tiles;
        foreach(var tile in gameView.PlayerHand)
        {
            var toRemove = HiddenTiles.Find(t => t.TileId == tile.TileId);
            if(toRemove != null)
            {
                HiddenTiles.Remove(toRemove);
            }
        }
        foreach(var tile in gameView.Table.TilesOnTable.Select(tt => tt.TileDetails).ToList())
        {
            var toRemove = HiddenTiles.Find(t => t.TileId == tile.TileId);
            if(toRemove != null)
            {
                HiddenTiles.Remove(toRemove);
            }
        }
        var myTilesTypes = new Dictionary<int, int>() {
            { 0, 0 }, { 1, 0 }, { 2, 0 }, { 3, 0 }, { 4, 0 }, { 5, 0 }, { 6, 0 }
        };
        foreach(var tile in gameView.PlayerHand)
        {
            myTilesTypes[tile.SideA]++;
            if(tile.SideA != tile.SideB)
            {
                myTilesTypes[tile.SideB]++;
            }
        }

        var hiddenTilesTypes = new Dictionary<int, int>() {
            { 0, 0 }, { 1, 0 }, { 2, 0 }, { 3, 0 }, { 4, 0 }, { 5, 0 }, { 6, 0 }
        };
        foreach(var tile in HiddenTiles)
        {
            hiddenTilesTypes[tile.SideA]++;
            if(tile.SideA != tile.SideB)
            {
                hiddenTilesTypes[tile.SideB]++;
            }
        }

        int left = gameView.Table.LeftFreeEnd ?? -1;
        int right = gameView.Table.RightFreeEnd ?? -1;
        List<(TileDetails tileDetails, int contactEdge, int wage)> wagesForMe = [];
        List<(TileDetails tileDetails, int contactEdge, int wage)> wagesAgainstOpponent = [];
        foreach(var possibility in _possibilities)
        {
            (int, int) potential = (left, right);
            var tile = possibility.tileDetails;
            if(possibility.contactEdge == left)
            {
                if(tile.SideA == left)
                {
                    potential.Item1 = tile.SideB;
                }
                else if(tile.SideB == left)
                {
                    potential.Item1 = tile.SideA;
                }
            }
            else
            {
                if(tile.SideA == right)
                {
                    potential.Item2 = tile.SideB;
                }
                else if(tile.SideB == right)
                {
                    potential.Item2 = tile.SideA;
                }
            }
            int wageForme = myTilesTypes[potential.Item1] + myTilesTypes[potential.Item2];
            wagesForMe.Add((tile, possibility.contactEdge, wageForme));

            int wageAgainstOpponent = -1 * (hiddenTilesTypes[potential.Item1] + hiddenTilesTypes[potential.Item2]);
        }
        var wagesResult = wagesForMe.Join(wagesAgainstOpponent,
            o => o.tileDetails.TileId + o.contactEdge, 
            i => i.tileDetails.TileId + i.contactEdge,
            (m, op) => new {
                Tile = m.tileDetails,
                Edge = m.contactEdge,
                Wage = m.wage * wageForMeCoeff + op.wage * wageAgainstOppCoeff
            });
        var toPlay = wagesResult.MaxBy(w => w.Wage);
        if(toPlay == null)
        {
            return new PlayTileMove(_possibilities[0].tileDetails, _possibilities[0].contactEdge);
        }
        return new PlayTileMove(toPlay.Tile, toPlay.Edge);
    }
}
