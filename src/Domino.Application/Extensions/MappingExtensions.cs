using Domino.Domain.Entities;

namespace Domino.Application.Extensions;

public static class MappingExtensions
{
    public static GameView ToGameView(this Game game, string playerName)
    {
        return new GameView()
        {
            Table = game.Table,
            MyHand = playerName == game.Player.Name ? game.Player.Hand : game.Opponent.Hand,
            Log = game.Log,
            GameStatus = game.GameStatus
        };
    }
}
