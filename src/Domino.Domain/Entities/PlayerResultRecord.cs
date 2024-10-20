using Domino.Domain.Enums;

namespace Domino.Domain.Entities;

public class PlayerResultRecord
{
    public string PlayerName { get; set; }
    public PlayerResultType PlayerResult { get; set; }
    public int PointsLeft {get; set; }
    public List<TileDetails> EndHand { get; set; } = [];
    public PlayerResultRecord(Player player, PlayerResultType playerResult)
    {
        PlayerName = player.Name;
        PlayerResult = playerResult;
        PointsLeft = CountPoints(player.Hand);
        EndHand = player.Hand;
    }
    private static int CountPoints(List<TileDetails> tileDetails)
    {
        int count = 0;
        foreach(var tileDetail in tileDetails)
        {
            count += tileDetail.SideA + tileDetail.SideB;
        }
        return count;
    }
}
