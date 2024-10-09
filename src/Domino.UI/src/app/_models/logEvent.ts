import { DominoTile } from "./dominoTile";
import { TileDetails } from "./tileDetails";

export interface LogEvent {
    moveNumber: number,
    playerName: string,
    type: number,
    tile: DominoTile
}