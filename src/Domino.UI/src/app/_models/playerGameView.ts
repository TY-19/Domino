import { TileDetails } from "./tileDetails"

export interface PlayerGameView {
    name: string;
    currentPoints: number;
    tilesCount: number;
    grabInRow: number;
    hand: TileDetails[];
}
