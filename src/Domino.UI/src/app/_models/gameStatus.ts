export interface GameStatus {
    gameType: string;
    huntPlayers: string[];
    status: string;
    isEnded: boolean;
    isDraw: boolean;
    result: string;
    winner: string;
    loser: string;
    loserPointsCount: [string, number];
    victoryType: string;
}