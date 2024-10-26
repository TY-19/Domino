import { VictoryType } from "../_enums/victoryType";
import { GameResultDetails } from "./gameResultDetails";
import { PlayerResultRecord } from "./playerResultRecord";

export interface GameResult {
    isEnded: boolean;
    isDraw: boolean;
    result: GameResultDetails;
    playerResultRecords: PlayerResultRecord[];
    victoryType: VictoryType;
    isInStatistic: boolean;
}
