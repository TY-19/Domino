export interface GameRules {
    maxGrabsInRow: number;
    minLeftInMarket: number;
    starterTiles: string[];
    huntStarterTiles: string[];
    pointsToStartHunt: number;
    workGoat: boolean;
    totalPointsToLoseWithGoat: number;
    lastTilePoints: Record<string, number>;
    morePointToEndWith: Record<string, number>;
}