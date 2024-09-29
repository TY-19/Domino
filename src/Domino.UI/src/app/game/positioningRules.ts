import { Direction } from "./enums/direction";
import { MoveType } from "./enums/moveType";
import { EdgeShift, StylePropShifts } from "./game.component";

export class PositioningRules {
    positionShifts: Map<number, StylePropShifts> = new Map<number, StylePropShifts>([
    [(Direction.Left + MoveType.TileInLine), {
      columnShift: -4,
      reverseRowShift: 1,
      reverseColumnShift: 3,
    }],
    [(Direction.Left + MoveType.DoubleInLine), {
      rowShift: -1,
      columnShift: -2
    }],
    [(Direction.Left + MoveType.CornerInLine), {
      rowShift: -2,
      columnShift: -2,
      reverseColumnShift: 1,
      reverseRowShift: 3,
    }],
    [(Direction.Left + MoveType.CornerOut), {
      rowShift: -4,
      reverseColumnShift: 1,
      reverseRowShift: 3,
    }],
    [(Direction.Left + MoveType.CornerOutDouble), {
      rowShift: -5,
      reverseColumnShift: 1,
      reverseRowShift: 3,
    }],
    [(Direction.Left + MoveType.RotateCorner), {
      rowShift: -2,
      columnShift: 2,
    }],
    [(Direction.Left + MoveType.RotateCornerAfterDouble), {
      rowShift: -5,
      columnShift: 4,
    }],

    [(Direction.Top + MoveType.TileInLine), {
      rowShift: -4,
      reverseRowShift: 3,
      reverseColumnShift: 1,
    }],
    [(Direction.Top + MoveType.DoubleInLine), {
      rowShift: -2,
      columnShift: -1
    }],
    [(Direction.Top + MoveType.CornerInLine), {
      rowShift: -2,
      reverseRowShift: 3,
    }],
    [(Direction.Top + MoveType.CornerOut), {
      columnShift: 2,
      reverseRowShift: 1,
      reverseColumnShift: 3,
    }],
    [(Direction.Top + MoveType.CornerOutDouble), {
      columnShift: 3,
      reverseRowShift: 1,
      reverseColumnShift: 3,
    }],
    [(Direction.Top + MoveType.RotateCorner), {
      rowShift: -1,
      columnShift: -1,
      reverseRowShift: 4,
      reverseColumnShift: 4
    }],
    [(Direction.Top + MoveType.RotateCornerAfterDouble), {
      rowShift: 2,
      columnShift: 5,
      reverseRowShift: 3,
      reverseColumnShift: 1
    }],
      
    [(Direction.Right + MoveType.TileInLine), {
      columnShift: 1,
      reverseRowShift: 1,
      reverseColumnShift: 3,
    }],
    [(Direction.Right + MoveType.DoubleInLine), {
      rowShift: -1,
      columnShift: 1
    }],
    [(Direction.Right + MoveType.CornerInLine), {
      columnShift: 1,
      reverseRowShift: 3,
    }],
    [(Direction.Right + MoveType.CornerOut), {
      columnShift: -1,
      rowShift: 2,
      reverseRowShift: 3,
    }],
    [(Direction.Right + MoveType.CornerOutDouble), {
      columnShift: 0,
      rowShift: 3,
      reverseRowShift: 3,
    }],
    [(Direction.Right + MoveType.RotateCorner), {
      rowShift: 0,
      columnShift: 0,
      reverseRowShift: 2,
      reverseColumnShift: -2
    }],
    [(Direction.Right + MoveType.RotateCornerAfterDouble), {
      rowShift: 3,
      columnShift: -4,
      reverseRowShift: 2,
      reverseColumnShift: 0
    }],
    
    [(Direction.Down + MoveType.TileInLine), {
      rowShift: 2,
      reverseRowShift: 3,
      reverseColumnShift: 1,
    }],
    [(Direction.Down + MoveType.DoubleInLine), {
      rowShift: 2,
      columnShift: -1,
    }],
    [(Direction.Down + MoveType.CornerInLine), {
      rowShift: 2,
      columnShift: -2,
      reverseRowShift: 1,
      reverseColumnShift: 3,
    }],
    [(Direction.Down + MoveType.CornerOut), {
      reverseRowShift: 1,
      columnShift: -4,
      reverseColumnShift: 3
    }],
    [(Direction.Down + MoveType.CornerOutDouble), {
      columnShift: -5,
      reverseRowShift: 1,
      reverseColumnShift: 3,
    }],
    [(Direction.Down + MoveType.RotateCorner), {
      columnShift: -2,
    }],
    [(Direction.Down + MoveType.RotateCornerAfterDouble), {
      rowShift: -5,
      columnShift: -6,
      reverseRowShift: 4,
      reverseColumnShift: 4
    }],
  ]);
  edgeShifts: Map<number, EdgeShift> = new Map<number, EdgeShift>([
    [(Direction.Left + MoveType.TileInLine), {
      columnShift: -4,
    }],
    [(Direction.Left + MoveType.DoubleInLine), {
      columnShift: -2,
    }],
    [(Direction.Left + MoveType.CornerInLine), {
      rowShift: -2,
      columnShift: -2
    }],
    [(Direction.Left + MoveType.CornerOut), {
      rowShift: -4
    }],
    [(Direction.Left + MoveType.CornerOutDouble), {
      rowShift: -5
    }],
    [(Direction.Left + MoveType.RotateCorner), {
      rowShift: -2,
      columnShift: 2
    }],
    [(Direction.Left + MoveType.RotateCornerAfterDouble), {
    }],

    [(Direction.Top + MoveType.TileInLine), {
      rowShift: -4
    }],
    [(Direction.Top + MoveType.DoubleInLine), {
      rowShift: -2
    }],
    [(Direction.Top + MoveType.CornerInLine), {
      rowShift: -2,
      columnShift: 3
    }],
    [(Direction.Top + MoveType.CornerOut), {
      columnShift: 5
    }],
    [(Direction.Top + MoveType.CornerOutDouble), {
      columnShift: 6
    }],
    [(Direction.Top + MoveType.RotateCorner), {
      rowShift: 2,
      columnShift: 3
    }],
    [(Direction.Top + MoveType.RotateCornerAfterDouble), {
      rowShift: 4,
      columnShift: 6
    }],

    [(Direction.Right + MoveType.TileInLine), {
      columnShift: 4
    }],
    [(Direction.Right + MoveType.DoubleInLine), {
      columnShift: 2
    }],
    [(Direction.Right + MoveType.CornerInLine), {
      columnShift: 1,
      rowShift: 2,
    }],
    [(Direction.Right + MoveType.CornerOut), {
      columnShift: -1,
      rowShift: 4
    }],
    [(Direction.Right + MoveType.CornerOutDouble), {
      columnShift: -1,
      rowShift: 5
    }],
    [(Direction.Right + MoveType.RotateCorner), {
      rowShift: 2,
      columnShift: -3,
    }],
    [(Direction.Right + MoveType.RotateCornerAfterDouble), {
      rowShift: 5,
      columnShift: -5,
    }],
    
    [(Direction.Down + MoveType.TileInLine), {
      rowShift: 4
    }],
    [(Direction.Down + MoveType.DoubleInLine), {
      rowShift: 2
    }],
    [(Direction.Down + MoveType.CornerInLine), {
      rowShift: 2,
      columnShift: -2
    }],
    [(Direction.Down + MoveType.CornerOut), {
      columnShift: -4
    }],
    [(Direction.Down + MoveType.CornerOutDouble), {
      columnShift: -5
    }],
    [(Direction.Down + MoveType.RotateCorner), {
      rowShift: 0,
      columnShift: 0,
    }],
    [(Direction.Down + MoveType.RotateCornerAfterDouble), {
      rowShift: -4,
      columnShift: -5,
    }],
  ]);
}
