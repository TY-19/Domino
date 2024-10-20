using Domino.Application.Models;
using Domino.Domain.Entities;

namespace Domino.Application.Extensions;

public static class MappingExtensions
{
    public static GameView ToGameView(this Game game, string? playerName = null)
    {
        var player = playerName == game.Player.Name ? game.Player : game.Opponent;
        var opponent = playerName == game.Player.Name ? game.Opponent : game.Player;
        return new GameView()
        {
            Id = game.Id,
            Table = game.Table,
            Player = new PlayerGameView(player, true),
            Opponent = new PlayerGameView(opponent, false),
            MarketTilesCount = game.Set.TilesCount,
            GameRules = game.GameRules,
            Log = game.Log,
            GameStatus = game.GameStatus,
            GameResult = game.GameResult,
            ErrorMessage = game.GameError?.ErrorMessage
        };
    }
}
