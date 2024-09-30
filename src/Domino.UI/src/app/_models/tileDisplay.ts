import { Direction } from "../game/enums/direction";
import { DominoTile } from "./dominoTile";
import { PositionOnTable } from "./positionOnTable";

export interface TileDisplay {
    id: string,
    positioning: PositionOnTable,
    isHorizontal: boolean,
    tile: DominoTile,
    direction: Direction
}