import { Direction } from "../game/enums/direction";
import { DominoTile } from "./dominoTile";
import { PositionOnTable } from "./positionOnTable";

export interface TileDisplay {
    tile: DominoTile,
    positioning: PositionOnTable,
    isHorizontal: boolean,
    direction: Direction
}