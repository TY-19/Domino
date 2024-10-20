using Domino.Domain.Enums;

namespace Domino.Domain.Entities;

public class GameResult
{
    public bool IsEnded { get; set; }
    public bool IsDraw { get; set; }
    public string? Result { get; set; }
    public List<PlayerResultRecord> PlayerResultRecords { get; set; } = [];
    public VictoryType VictoryType { get; set; }
    public bool IsInStatistic { get; set; }
    public GameResult(Player? winner, Game game)
    {
        IsEnded = true;
        if(winner == null)
        {
            IsDraw = true;
            var playerRecord = new PlayerResultRecord(game.Player, PlayerResultType.Draw);
            var opponentRecord = new PlayerResultRecord(game.Opponent, PlayerResultType.Draw);
            PlayerResultRecords.Add(playerRecord);
            PlayerResultRecords.Add(opponentRecord);
            VictoryType = VictoryType.Draw;
            Result = BuildResultMessage(VictoryType.Draw)
                + $"{game.Player.Name} - {playerRecord.PointsLeft}\n"
                + $"{game.Opponent.Name} - {opponentRecord.PointsLeft}";
        }
        else
        {
            IsDraw = false;
            Player loser = winner.Name == game.Player.Name ? game.Opponent : game.Player;
            var winnerRecord = new PlayerResultRecord(winner, PlayerResultType.Win);
            var loserRecord = new PlayerResultRecord(loser, PlayerResultType.Lose);
            PlayerResultRecords.Add(winnerRecord);
            PlayerResultRecords.Add(loserRecord);
            VictoryType = ChooseVictoryType(winner, loser, game);
            Result = $"{ winner.Name } win!" + BuildResultMessage(VictoryType);
            if(VictoryType == VictoryType.Normal)
            {
                Result += $"\n{loser.Name} is left with {loserRecord.PointsLeft} points.";
            }
        }
    }
    private static VictoryType ChooseVictoryType(Player winner, Player loser, Game game)
    {
        var lastTile = game.Log.Events
            .Where(e => e.PlayerName == winner.Name)
            .MaxBy(e => e.MoveNumber);
        if(game.GameStatus.IsHunted(loser.Name))
        {
            return lastTile?.Tile?.TileDetails.TileId == "0-0" 
                ? VictoryType.General
                : VictoryType.Goat;
        }
        else if(lastTile?.Tile?.TileDetails.TileId == "0-0")
        {
            return VictoryType.Officer;
        }
        else if(game.GameStatus.IsHunted(winner.Name))
        {
            return VictoryType.ClearedPoints;
        }
        else
        {
            return VictoryType.Normal;
        }
    }
    private static string BuildResultMessage(VictoryType victoryType)
    {
        return victoryType switch
        {
            VictoryType.Draw => "The game ended up in a draw.\nPoints count is:\n",
            VictoryType.Normal => " Normal victory.",
            VictoryType.ClearedPoints => " Points cleared.",
            VictoryType.Goat => " Goat!",
            VictoryType.Officer => " Officer!!!",
            VictoryType.General => " General!!!!!",
            _ => "",
        };
    }
}
