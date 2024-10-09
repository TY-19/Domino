import { TileDetails } from "./tileDetails";

export interface GameStatus {
    gameType: string;
    huntPlayers: string[];
    status: string;
    isEnded: boolean;
    isDraw: boolean;
    result: string;
    winner: string;
    loser: string;
    endHands: Record<string, TileDetails[]>;
    loserPointsCount: [string, number];
    victoryType: string;
}