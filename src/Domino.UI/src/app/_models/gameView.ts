import { GameError } from "./gameError";
import { GameResult } from "./gameResult";
import { GameRules } from "./gameRules";
import { GameStatus } from "./gameStatus";
import { GameTable } from "./gameTable";
import { LogEvent } from "./logEvent"
import { PlayerGameView } from "./playerGameView";

export interface GameView {
    id: number;
    error: GameError;
    table: GameTable;
    player: PlayerGameView;
    opponent: PlayerGameView;
    marketTilesCount: number;
    gameStatus: GameStatus;
    gameResult?: GameResult;
    gameRules: GameRules;
    log: {
        events: LogEvent[]
    };
}