import { TileDetails } from "./tileDetails";

export interface LogEvent {
    moveNumber: number,
    playerName: string,
    type: number,
    tile: TileDetails,
    nextToTile: TileDetails | null
}