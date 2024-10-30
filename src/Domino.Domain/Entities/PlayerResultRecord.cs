using Domino.Domain.Enums;

namespace Domino.Domain.Entities;

public class PlayerResultRecord
{
    public string PlayerName { get; set; }
    public PlayerResultType PlayerResult { get; set; }
    public int PointsLeft {get; set; }
    public List<TileDetails> EndHand { get; set; } = [];
    public PlayerResultRecord(Player player, PlayerResultType playerResult, GameRules rules)
    {
        PlayerName = player.Name;
        PlayerResult = playerResult;
        PointsLeft = CountPoints(player.Hand, rules);
        EndHand = player.Hand;
    }
    private static int CountPoints(List<TileDetails> tileDetails, GameRules rules)
    {
        int count = 0;
        if(tileDetails.Count == 1 && rules.LastTilePoints.TryGetValue(tileDetails[0].TileId, out int points))
        {
            return points;
        }
        foreach(var tileDetail in tileDetails)
        {
            count += tileDetail.SideA + tileDetail.SideB;
        }
        return count;
    }
}
