import { GameStatus } from "./gameStatus";
import { GameTable } from "./gameTable";
import { LogEvent } from "./logEvent"
import { TileDetails } from "./tileDetails";

export interface GameView {
    id: number;
    table: GameTable,
    playerName: string;
    playerHand: TileDetails[];
    opponentName: string;
    opponentTilesCount: number;
    marketTilesCount: number;
    gameStatus: GameStatus;
    log: {
        events: LogEvent[]
    };
}