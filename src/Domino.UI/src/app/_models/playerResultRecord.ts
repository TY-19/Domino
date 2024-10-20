import { PlayerResultType } from "../_enums/playerResultType";
import { TileDetails } from "./tileDetails";

export interface PlayerResultRecord
{
    playerName: string;
    playerResult: PlayerResultType;
    pointsLeft: number;
    endHand: TileDetails[];
}