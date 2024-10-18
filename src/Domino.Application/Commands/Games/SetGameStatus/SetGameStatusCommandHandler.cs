using Domino.Application.Interfaces;
using Domino.Domain.Entities;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Domino.Application.Commands.Games.SetGameStatus;

public class SetGameStatusCommandHandler : IRequestHandler<SetGameStatusCommand, Game>
{
    private readonly IStrategyFactory _strategyFactory;
    private readonly ILogger<SetGameStatusCommandHandler> _logger;
    public SetGameStatusCommandHandler(
        IStrategyFactory strategyFactory,
        ILogger<SetGameStatusCommandHandler> logger
        )
    {
        _strategyFactory = strategyFactory;
        _logger = logger;
    }
    public Task<Game> Handle(SetGameStatusCommand command, CancellationToken cancellationToken)
    {
        var game = command.Game;
        if(game.Player.Hand.Count == 0)
        {
            SetGameStatus(game, game.Player.Name);
        }
        else if (game.Opponent.Hand.Count == 0)
        {
            SetGameStatus(game, game.Opponent.Name);
        }
        else if((game.Set.TilesCount <= game.GameRules.MinLeftInMarket
            || game.Table.GetPossibleMoves(game.Set.Tiles).Count == 0)
            && game.Table.GetPossibleMoves(game.Player.Hand).Count == 0
            && game.Table.GetPossibleMoves(game.Opponent.Hand).Count == 0)
        {
            game.GameStatus.IsEnded = true;
            game.GameStatus.LoserPointsCount[0] = (game.Player.Name, CountPoints(game.Player.Hand));
            game.GameStatus.LoserPointsCount[1] = (game.Opponent.Name, CountPoints(game.Opponent.Hand));
            game.GameStatus.EndHands[game.Player.Name] = game.Player.Hand;
            game.GameStatus.EndHands[game.Opponent.Name] = game.Opponent.Hand;
            game.GameStatus.Result = "The game ended up in a draw.\nPoints count is:\n"
                + $"{game.Player.Name} - {game.GameStatus.LoserPointsCount[0].Item2}\n"
                + $"{game.Opponent.Name} - {game.GameStatus.LoserPointsCount[1].Item2}";
        }
        return Task.FromResult(game);
    }
    private static void SetGameStatus(Game game, string playerName)
    {
        game.GameStatus.IsEnded = true;
        if(playerName == game.Player.Name)
        {
            game.GameStatus.Winner = game.Player.Name;
            game.GameStatus.Loser = game.Opponent.Name;
        }
        else
        {
            game.GameStatus.Winner = game.Opponent.Name;
            game.GameStatus.Loser = game.Player.Name;
        }
        game.GameStatus.Result = $"{game.GameStatus.Winner} win!";
        var lastTile = game.Log.Events
            .Where(e => e.PlayerName == playerName)
            .MaxBy(e => e.MoveNumber);
        
        if(game.GameStatus.HuntPlayers.Contains(game.GameStatus.Loser))
        {
            if(lastTile?.Tile?.TileDetails.TileId == "0-0")
            {
                game.GameStatus.VictoryType = "General";
            }
            else
            {
                game.GameStatus.VictoryType = "Goat";
            }
        }
        else if(lastTile?.Tile?.TileDetails.TileId == "0-0")
        {
            game.GameStatus.VictoryType = "Officer";
        }
        else if(game.GameStatus.HuntPlayers.Contains(game.GameStatus.Winner))
        {
            game.GameStatus.VictoryType = "Cleared points";
        }
        else
        {
            game.GameStatus.VictoryType = "Normal Victory";
            var loserHand = game.GameStatus.Loser == game.Player.Name
                ? game.Player.Hand
                : game.Opponent.Hand;
            game.GameStatus.EndHands[game.GameStatus.Loser] = loserHand;
            game.GameStatus.LoserPointsCount[0] = (game.GameStatus.Loser, CountPoints(loserHand));
            game.GameStatus.Result ??= "";
            game.GameStatus.Result += $"\n{game.GameStatus.Loser} is left with {game.GameStatus.LoserPointsCount[0].Item2} points.";
        }
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
