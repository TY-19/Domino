import { DominoTile } from "./dominoTile";

export interface DominoTilePosition {
    tile: DominoTile;
    position: number; // 0 - start; <0 - left; >0 - right
    contactEdge: number;
}