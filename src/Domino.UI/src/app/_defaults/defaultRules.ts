import { GameRules } from "../_models/gameRules";

export const defaultRules: GameRules = {
    maxGrabsInRow: 3,
    minLeftInMarket: 1,
    pointsToStartHunt: 25,
    workGoat: true,
    totalPointsToLoseWithGoat: 125,
    starterTiles: [ "1-1", "2-2", "3-3", "4-4", "5-5", "6-6" ],
    huntStarterTiles: [ "6-6" ],
    lastTilePoints: {
        "0-0": 25,
        "6-6": 50
    },
    morePointToEndWith: { "6-6": 100 }
};
