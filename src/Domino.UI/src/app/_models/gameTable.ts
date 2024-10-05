import { DominoTile } from "./dominoTile";

export interface GameTable {
    leftPosition: number | null;
    leftFreeEnd: number | null;
    rightPosition: number | null;
    rightFreeEnd: number | null;
    tilesOnTable: DominoTile[];
}
