using Domino.Domain.Enums;

namespace Domino.Domain.Entities;

public class GameResult
{
    public bool IsEnded { get; set; }
    public bool IsDraw { get; set; }
    public GameResultDetails? Result { get; set; }
    public List<PlayerResultRecord> PlayerResultRecords { get; set; } = [];
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
            Dictionary<string, string> data = new()
            {
                { "player", game.Player.Name },
                { "playerPoints", playerRecord.PointsLeft.ToString() },
                { "opponent", game.Opponent.Name },
                { "opponentPoints", opponentRecord.PointsLeft.ToString() }
            };
            Result = new(VictoryType.Draw, data);
        }
        else
        {
            IsDraw = false;
            Player loser = winner.Name == game.Player.Name ? game.Opponent : game.Player;
            var winnerRecord = new PlayerResultRecord(winner, PlayerResultType.Win);
            var loserRecord = new PlayerResultRecord(loser, PlayerResultType.Lose);
            PlayerResultRecords.Add(winnerRecord);
            PlayerResultRecords.Add(loserRecord);
            var victoryType = ChooseVictoryType(winner, loser, game);
            Dictionary<string, string> data = new()
            {
                { "winner", winner.Name },
            };
            if(victoryType == VictoryType.Normal)
            {
                data.Add("loser", loser.Name);
                data.Add("pointsLeft", loserRecord.PointsLeft.ToString());
            }
            Result = new(victoryType, data);
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
}
