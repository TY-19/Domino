using Domino.Application.Models;
using Domino.Domain.Entities;

namespace Domino.Application.Extensions;

public static class MappingExtensions
{
    public static GameView ToGameView(this Game game, string playerName)
    {
        return new GameView()
        {
            Id = game.Id,
            Table = game.Table,
            PlayerName = playerName,
            PlayerCurrentPoints = game.Player.Info.CurrentPointCount,
            PlayerHand = playerName == game.Player.Name ? game.Player.Hand : game.Opponent.Hand,
            PlayerGrabInRow = game.Player.GrabInRow,
            OpponentName = playerName == game.Player.Name ? game.Opponent.Name : game.Player.Name,
            OpponentCurrentPoints = game.Opponent.Info.CurrentPointCount,
            OpponentGrabInRow = game.Opponent.GrabInRow,
            OpponentTilesCount = playerName == game.Player.Name ? game.Opponent.Hand.Count : game.Player.Hand.Count,
            MarketTilesCount = game.Set.TilesCount,
            GameRules = game.GameRules,
            Log = game.Log,
            GameStatus = game.GameStatus,
            ErrorMessage = game.GameError?.ErrorMessage
        };
    }
}
