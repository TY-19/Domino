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
            var playerRecord = new PlayerResultRecord(game.Player, PlayerResultType.Draw, game.GameRules);
            var opponentRecord = new PlayerResultRecord(game.Opponent, PlayerResultType.Draw, game.GameRules);
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
            var winnerRecord = new PlayerResultRecord(winner, PlayerResultType.Win, game.GameRules);
            var loserRecord = new PlayerResultRecord(loser, PlayerResultType.Lose, game.GameRules);
            var lastTileId = game.Log.Events
                .Where(e => e.PlayerName == winner.Name)
                .MaxBy(e => e.MoveNumber)?.Tile?.TileDetails.TileId ?? "-1";
            var victoryType = ChooseVictoryType(winner, loser, game, lastTileId);
            if(game.GameRules.MorePointToEndWith.TryGetValue(lastTileId, out int additionalPoints)
                && victoryType == VictoryType.Normal)
            {
                loserRecord.PointsLeft += additionalPoints;
            }
            PlayerResultRecords.Add(winnerRecord);
            PlayerResultRecords.Add(loserRecord);
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
    private static VictoryType ChooseVictoryType(Player winner, Player loser, Game game, string lastTileId)
    {
        if(game.GameStatus.IsHunted(loser.Name))
        {
            return lastTileId == "0-0" 
                ? VictoryType.General
                : VictoryType.Goat;
        }
        else if(lastTileId == "0-0")
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
