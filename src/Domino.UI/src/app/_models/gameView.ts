import { GameStatus } from "./gameStatus";
import { GameTable } from "./gameTable";
import { LogEvent } from "./logEvent"
import { TileDetails } from "./tileDetails";

export interface GameView {
    id: number;
    errorMessage: string | null;
    table: GameTable,
    playerName: string;
    playerCurrentPoints: number;
    playerHand: TileDetails[];
    opponentName: string;
    opponentCurrentPoints: number;
    opponentTilesCount: number;
    marketTilesCount: number;
    gameStatus: GameStatus;
    log: {
        events: LogEvent[]
    };
}