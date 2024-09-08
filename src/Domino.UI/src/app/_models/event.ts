import { DominoTile } from "./dominoTile";

export interface Event {
    moveNumber: number,
    playerName: string,
    type: number,
    tile: DominoTile
}