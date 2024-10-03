import { TileDetails } from "./tileDetails";

export interface DominoTile {
    tileDetails: TileDetails;
    position: number;
    contactEdge: number;
    freeEnd: number;
}