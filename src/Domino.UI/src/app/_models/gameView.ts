import { GameResult } from "./gameResult";
import { GameRules } from "./gameRules";
import { GameStatus } from "./gameStatus";
import { GameTable } from "./gameTable";
import { LogEvent } from "./logEvent"
import { Player } from "./player";
import { TileDetails } from "./tileDetails";

export interface GameView {
    id: number;
    errorMessage: string | null;
    table: GameTable;
    player: Player;
    opponent: Player;
    marketTilesCount: number;
    gameStatus: GameStatus;
    gameResult?: GameResult;
    gameRules: GameRules;
    log: {
        events: LogEvent[]
    };
}