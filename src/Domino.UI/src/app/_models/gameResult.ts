import { VictoryType } from "../_enums/victoryType";
import { PlayerResultRecord } from "./playerResultRecord";

export interface GameResult {
    isEnded: boolean;
    isDraw: boolean;
    result: string;
    playerResultRecords: PlayerResultRecord[];
    victoryType: VictoryType;
    isInStatistic: boolean;
}
