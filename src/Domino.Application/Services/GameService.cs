using Domino.Domain.Entities;

namespace Domino.Application.Services;

public class GameService
{
    private DominoSet _set = null!;
    private Table _table = null!;
    private Player _player = null!;
    private Player _opponent = null!;
    GameLog _log = null!;
    public void StartGame(string playerName, string opponentName)
    {
        _player = new HumanPlayer(playerName);
        _opponent = new AiPlayer(opponentName);
         _set = new();
        _table = new();
        _log = new();
        ServeStartHands();
    }
    public List<DominoTile> GetHand()
    {
        return _player.GetHand();
    }
    
    public LinkedList<DominoTile> GetTable()
    {
        return _table.GetTilesOnTable();
    }
    public void PlayTile(string tileId)
    {
        var tile = _player.GetTileFromHand(tileId)
            ?? throw new ArgumentException("Wrong tile id");
        if (tile != null && _table.CanBePlayed(tile))
        {
            _player.PlayTile(tile);
            _table.PlaceTile(tile);
        }
    }
    public void GrabTile()
    {
        if(_log.CanGrabAnotherTile(_player.Name))
        {
            var tile = _set.ServeTile();
            _player.GrabTile(tile);
        }
    }
    public void WaitOpponentTurn()
    {
        var move = (_opponent as AiPlayer)?.MakeMove(_table);
        switch (move)
        {
            case PlayTileMove ptm:
                _opponent.PlayTile(ptm.Tile);
                _table.PlaceTile(ptm.Tile);
                break;
            case GrabTileMove:
                if(_log.CanGrabAnotherTile(_opponent.Name))
                {
                    WaitOpponentTurn();
                }
                break;
            default:
                break;
        }
    }
    private void ServeStartHands()
    {
        for (int i = 0; i < 7; i++)
        {
            _player.GrabTile(_set.ServeTile());
            _opponent.GrabTile(_set.ServeTile());
        }
    }
}