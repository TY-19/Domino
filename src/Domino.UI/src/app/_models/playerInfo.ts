import { PlayerType } from "../_enums/playerType";
import { StrategyCoefficients } from "./strategyCoefficients";

export interface PlayerInfo {
    playerName: string;
    type: PlayerType;
    currentPointCount: number;
    coefficients: StrategyCoefficients;
}
