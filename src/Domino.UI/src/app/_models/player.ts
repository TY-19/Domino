import { PlayerInfo } from "./playerInfo";
import { TileDetails } from "./tileDetails";

export interface Player {
    name: string;
    info: PlayerInfo;
    currentPoints: number;
    tilesCount: number;
    grabInRow: number;
    hand: TileDetails[];
}
