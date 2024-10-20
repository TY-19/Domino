import { TileDetails } from "./tileDetails"

export interface Player {
    name: string;
    currentPoints: number;
    tilesCount: number;
    grabInRow: number;
    hand: TileDetails[];
}
