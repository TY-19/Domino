import { GameRules } from "./gameRules";
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
    playerGrabInRow: number;
    opponentName: string;
    opponentCurrentPoints: number;
    opponentTilesCount: number;
    OpponentGrabInRow: number;
    marketTilesCount: number;
    gameStatus: GameStatus;
    gameRules: GameRules;
    log: {
        events: LogEvent[]
    };
}