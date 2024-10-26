import { VictoryType } from "../_enums/victoryType";

export interface GameResultDetails {
    victoryType: VictoryType,
    message?: string,
    data: Record<string, string>
}
