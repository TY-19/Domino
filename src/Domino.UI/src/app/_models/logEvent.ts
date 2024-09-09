import { DominoTile } from "./dominoTile";

export interface LogEvent {
    moveNumber: number,
    playerName: string,
    type: number,
    tile: DominoTile,
    nextToTile: DominoTile | null
}