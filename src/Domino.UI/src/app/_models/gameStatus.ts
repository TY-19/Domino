import { GameType } from "../_enums/gameType";

export interface GameStatus {
    gameType: GameType;
    hunters: string[];
    hunted: string[];
}