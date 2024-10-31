using Domino.Application.Commands.Games.GrabTile;
using Domino.Application.Commands.Games.MakeOpponentMove;
using Domino.Application.Commands.Games.PlayTile;
using Domino.Application.Commands.Games.SaveGame;
using Domino.Application.Commands.Games.SelectOpponentMove;
using Domino.Application.Commands.Games.StartGame;
using Domino.Application.Commands.Players.CreatePlayer;
using Domino.Application.Commands.Players.UpdatePlayersStatistic;
using Domino.Application.Exceptions;
using Domino.Application.Extensions;
using Domino.Application.Interfaces;
using Domino.Application.Models;
using Domino.Application.Queries.Games.CheckDoublePlay;
using Domino.Application.Queries.Games.GetCurrentGame;
using Domino.Domain.Entities;
using Domino.Domain.Enums;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Domino.Application.Services;

public class GameService : IGameService
{
    private readonly IMediator _mediator;
    private readonly ILogger<GameService> _logger;
    private static readonly GameRules DefaultRules = new() 
    {
        MaxGrabsInRow = 3,
        MinLeftInMarket = 1,
        PointsToStartHunt = 25,
        WorkGoat = true,
        TotalPointsToLoseWithGoat = 125,
        StarterTiles = ["1-1", "2-2", "3-3", "4-4", "5-5", "6-6"],
        HuntStarterTiles = ["6-6"],
        LastTilePoints = new()
        {
            { "0-0", 25 },
            { "6-6", 50 }
        },
        MorePointToEndWith = new()
        {
            { "6-6", 100 }
        }
    };
    public GameService(
        IMediator mediator,
        ILogger<GameService> logger)
    {
        _mediator = mediator;
        _logger = logger;
    }
    public async Task<GameView?> GetCurrentGameAsync(string playerName)
    {
        var game = await _mediator.Send(new GetCurrentGameRequest() {
            PlayerName = playerName
        });
        return game?.ToGameView(game.Player.Name);
    }
    public async Task<GameView> StartGameAsync(string playerName, string opponentName,
        GameRules? rules = null)
    {
        var command = new StartGameCommand()
        {
            Player = await _mediator.Send(new CreatePlayerCommand() { PlayerName = playerName }),
            Opponent = await _mediator.Send(new CreatePlayerCommand() { PlayerName = opponentName, IsAI = true }),
            Rules = rules ?? DefaultRules
        };
        var game = await _mediator.Send(command);
        // _logger.LogInformation("Current game: {@game}", game);
        if(game.IsOpponentTurn)
        {
            await WaitOpponentTurnAsync(game);
        }
        return game.ToGameView(game.Player.Name);
    }
    public async Task<GameView> PlayTileAsync(string playerName, PlayTileDto playTileDto)
    {
        _logger.LogInformation("PlayTile {tileId} to edge, left: {isLeft}", playTileDto.TileId, playTileDto.IsLeft);
        Game game = await GetGameAsync(playerName);
        EnsureGameHasNotEnded(game);
        // _logger.LogInformation("Current game: {@game}", game);
        game = await _mediator.Send(new PlayTileCommand() { Game = game, PlayTileDto = playTileDto });
        return await WaitOpponentTurnAsync(game);
    }
    public async Task<GameView> DoublePlayAsync(string playerName, PlayTileDto[] playTileDtos)
    {
        Game game = await GetGameAsync(playerName);
        EnsureGameHasNotEnded(game);
        var request = new CheckDoublePlayRequest()
        {
            PlayerName = playerName,
            Game = game,
            PlayTileDtos = playTileDtos
        };
        if(!await _mediator.Send(request))
        {
            game.GameError = new GameError(ErrorType.NoDoublePlayPossible);
            return game.ToGameView(playerName);
        }
        game = await _mediator.Send(new PlayTileCommand() { Game = game, PlayTileDto = playTileDtos[0] });
        game.IsOpponentTurn = !game.IsOpponentTurn;
        return await PlayTileAsync(playerName, playTileDtos[1]);
    }
    public async Task<GameView> GrabTileAsync(string playerName)
    {
        var game = await GetGameAsync(playerName);
        EnsureGameHasNotEnded(game);
        game = await _mediator.Send(new GrabTileCommand() { Game = game });
        return game.ToGameView(game.Player.Name);
    }
    public async Task<GameView> WaitOpponentTurnAsync(string playerName)
    {
        var game = await GetGameAsync(playerName);
        EnsureGameHasNotEnded(game);
        if(!game.IsOpponentTurn)
        {
            game = await _mediator.Send(new GrabTileCommand() { Game = game });
            if(!game.IsOpponentTurn)
            {
                return game.ToGameView(playerName);
            }
        }
        return await WaitOpponentTurnAsync(game);
    }
    private async Task<GameView> WaitOpponentTurnAsync(Game game)
    {
        _logger.LogInformation("Check for endgame conditions for player");
        game.TrySetResult();
        if(game.GameResult?.IsEnded == true)
        {
            game.IsOpponentTurn = false;
            await HandleGameEndAsync(game);
        }
        if(!game.IsOpponentTurn)
        {
            return game.ToGameView(game.Player.Name);
        }
        while(game.IsOpponentTurn)
        {
            var move = await _mediator.Send(new SelectOpponentMoveCommand() { Game = game });
            game = await _mediator.Send(new MakeOpponentMoveCommand() { Game = game, Move = move });
        }
        _logger.LogInformation("Check for endgame conditions for opponent");
        game.TrySetResult();
        if(game.GameResult?.IsEnded == true)
        {
            await HandleGameEndAsync(game);
        }
        return game.ToGameView(game.Player.Name);
    }
    private async Task HandleGameEndAsync(Game game)
    {
        await _mediator.Send(new UpdatePlayersStatisticCommand() { Game = game });
        await _mediator.Send(new SaveGameCommand() { Game = game });
    }

    private async Task<Game> GetGameAsync(string playerName)
    {
        var game = await _mediator.Send(new GetCurrentGameRequest() { PlayerName = playerName });
        if(game == null)
        {
            var command = new StartGameCommand()
            {
                Player = await _mediator.Send(new CreatePlayerCommand() { PlayerName = playerName }),
                Opponent = await _mediator.Send(new CreatePlayerCommand() { PlayerName = "AI", IsAI = true }),
            };
            game = await _mediator.Send(command);
        }
        return game;
    }
    private static void EnsureGameHasNotEnded(Game game)
    {
        if(game.GameResult?.IsEnded == true)
        {
            game.GameError = new(ErrorType.GameEnded);
            throw new GameException(game, "Game has already ended.");
        }
    }
}
