using Domino.Application.Interfaces;
using Domino.Domain.Entities;

namespace Domino.Application.Services;

public class PlayerStatisticService : IPlayerStatisticService
{
    private readonly IPlayerStatisticRepository _repo;
    public PlayerStatisticService(IPlayerStatisticRepository repo)
    {
        _repo = repo;
    }
    public IEnumerable<PlayerStatistic> GetAllPlayersStatistics()
    {
        return _repo.GetAllPlayersStatistics();
    }
    public void UpdateCreatePlayersStatistic(GameStatus gameStatus)
    {
        if(!gameStatus.IsEnded || gameStatus.IsInStatistic)
        {
            return;
        }
        if(gameStatus.IsDraw)
        {
            var playerOneStatistic = _repo.GetPlayerStatistic(gameStatus.LoserPointsCount[0].Item1)
                ?? new PlayerStatistic(gameStatus.LoserPointsCount[0].Item1);
            var playerTwoStatistic = _repo.GetPlayerStatistic(gameStatus.LoserPointsCount[1].Item1)
                ?? new PlayerStatistic(gameStatus.LoserPointsCount[1].Item1);
            playerOneStatistic.GamesPlayed++;
            playerTwoStatistic.GamesPlayed++;
            playerOneStatistic.Draws++;
            playerTwoStatistic.Draws++;
            if(gameStatus.HuntPlayers.Contains(playerOneStatistic.PlayerName))
            {
                playerOneStatistic.WasHunted++;
                playerTwoStatistic.WasHunter++;
            }
            if(gameStatus.HuntPlayers.Contains(playerTwoStatistic.PlayerName))
            {
                playerTwoStatistic.WasHunted++;
                playerOneStatistic.WasHunter++;
            }


            _repo.UpdatePlayerStatistic(playerOneStatistic);
            _repo.UpdatePlayerStatistic(playerTwoStatistic);
        }
        else
        {
            if(gameStatus.Winner == null)
            {
                throw new ArgumentException(nameof(gameStatus.Winner));
            }
            if(gameStatus.Loser == null)
            {
                throw new ArgumentException(nameof(gameStatus.Loser));
            }
            var winnerStatistic = _repo.GetPlayerStatistic(gameStatus.Winner)
                ?? new PlayerStatistic(gameStatus.Winner);
            var loserStatistic = _repo.GetPlayerStatistic(gameStatus.Loser)
                ?? new PlayerStatistic(gameStatus.Loser);
            winnerStatistic.GamesPlayed++;
            loserStatistic.GamesPlayed++;
            winnerStatistic.Wins++;
            loserStatistic.Loses++;
            if(gameStatus.HuntPlayers.Contains(winnerStatistic.PlayerName))
            {
                winnerStatistic.WasHunted++;
                loserStatistic.WasHunter++;
            }
            if(gameStatus.HuntPlayers.Contains(loserStatistic.PlayerName))
            {
                loserStatistic.WasHunted++;
                winnerStatistic.WasHunter++;
            }
            switch(gameStatus.VictoryType)
            {
                case "Cleared points":
                    if(gameStatus.HuntPlayers.Contains(winnerStatistic.PlayerName))
                    {
                        winnerStatistic.ClearedPoints++;
                    }
                    if(gameStatus.HuntPlayers.Contains(loserStatistic.PlayerName))
                    {
                        winnerStatistic.SuccessfulHunt++;
                    }
                    break;
                case "Normal Victory":
                    winnerStatistic.NormalVictoryWins++;
                    loserStatistic.NormalVictoryLoses++;
                    break;
                case "Goat":
                    winnerStatistic.GoatWins++;
                    loserStatistic.GoatLoses++;
                    break;
                case "Officer":
                    winnerStatistic.OfficerWins++;
                    loserStatistic.OfficerLoses++;
                    break;
                case "General":
                    winnerStatistic.GeneralWins++;
                    loserStatistic.GeneralLoses++;
                    break;
                default:
                    break;
            }
            winnerStatistic.TotalPointsLeftWith += gameStatus.LoserPointsCount.FirstOrDefault(c => c.Item1 == winnerStatistic.PlayerName).Item2;
            loserStatistic.TotalPointsLeftWith += gameStatus.LoserPointsCount.FirstOrDefault(c => c.Item1 == loserStatistic.PlayerName).Item2;
            
            _repo.UpdatePlayerStatistic(winnerStatistic);
            _repo.UpdatePlayerStatistic(loserStatistic);
        }
        gameStatus.IsInStatistic = true;
    }
}
