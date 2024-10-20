using Domino.Domain.Entities;

namespace Domino.Application.Models;

public class PlayerGameView
{
    public string Name { get; set; } = null!;
    public int CurrentPoints { get; set; }
    public int TilesCount { get; set; }
    public int GrabInRow { get; set; }
    public List<TileDetails> Hand { get; set; } = [];
    public PlayerGameView(Player player, bool openHand)
    {
        Name = player.Name;
        CurrentPoints = player.Info.CurrentPointCount;
        TilesCount = player.Hand.Count;
        GrabInRow = player.GrabInRow;
        if(openHand)
        {
            Hand = player.Hand;
        }
    }
}
