using Domino.Application.Interfaces;
using MediatR;

namespace Domino.Application.Commands.Games.SaveGame;

public class SaveGameCommandHandler : IRequestHandler<SaveGameCommand>
{
    private readonly IGameRepository _gameRepository;
    public SaveGameCommandHandler(IGameRepository gameRepository)
    {
        _gameRepository = gameRepository;
    }
    public async Task Handle(SaveGameCommand command, CancellationToken cancellationToken)
    {
        await _gameRepository.SaveGameAsync(command.Game);
    }
}
