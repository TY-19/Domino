import { Direction } from "../game/enums/direction"

export interface PositionOnTable {
    row: number,
    column: number,
    rotateTile?: boolean
    currentDirection?: Direction
}