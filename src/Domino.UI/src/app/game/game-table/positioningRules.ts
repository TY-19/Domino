import { Direction } from "../enums/direction";
import { MoveType } from "../enums/moveType";
import { PositionShift } from "../../_models/positionShift";

export class PositioningRules {
    public static readonly positionShifts: Map<number, PositionShift> = new Map<number, PositionShift>([
    [(Direction.Left + MoveType.TileInLine), {
      columnShift: -4,
      reverseRowShift: 1,
      reverseColumnShift: 3,
      edgeColumnShift: -4,
    }],
    [(Direction.Left + MoveType.DoubleInLine), {
      rowShift: -1,
      columnShift: -2,
      edgeColumnShift: -2,
    }],
    [(Direction.Left + MoveType.CornerInLine), {
      rowShift: -2,
      columnShift: -2,
      reverseColumnShift: 1,
      reverseRowShift: 3,
      edgeRowShift: -2,
      edgeColumnShift: -2
    }],
    [(Direction.Left + MoveType.CornerOut), {
      rowShift: -4,
      reverseColumnShift: 1,
      reverseRowShift: 3,
      edgeRowShift: -4
    }],
    [(Direction.Left + MoveType.CornerOutDouble), {
      rowShift: -5,
      reverseColumnShift: 1,
      reverseRowShift: 3,
      edgeRowShift: -5
    }],
    [(Direction.Left + MoveType.RotateCorner), {
      rowShift: -2,
      columnShift: 2,
      reverseRowShift: 3,
      reverseColumnShift: 1,
      edgeRowShift: -2,
      edgeColumnShift: 2
    }],
    [(Direction.Left + MoveType.RotateCornerAfterDouble), {
      rowShift: -5,
      columnShift: 4,
      reverseRowShift: 3,
      reverseColumnShift: 1,
      edgeRowShift: -5,
      edgeColumnShift: 4
    }],

    [(Direction.Top + MoveType.TileInLine), {
      rowShift: -4,
      reverseRowShift: 3,
      reverseColumnShift: 1,
      edgeRowShift: -4
    }],
    [(Direction.Top + MoveType.DoubleInLine), {
      rowShift: -2,
      columnShift: -1,
      edgeRowShift: -2
    }],
    [(Direction.Top + MoveType.CornerInLine), {
      rowShift: -2,
      reverseRowShift: 1,
      reverseColumnShift: 3,
      edgeRowShift: -2,
      edgeColumnShift: 3
    }],
    [(Direction.Top + MoveType.CornerOut), {
      columnShift: 2,
      reverseRowShift: 1,
      reverseColumnShift: 3,
      edgeColumnShift: 5
    }],
    [(Direction.Top + MoveType.CornerOutDouble), {
      columnShift: 3,
      reverseRowShift: 1,
      reverseColumnShift: 3,
      edgeColumnShift: 6
    }],
    [(Direction.Top + MoveType.RotateCorner), {
      rowShift: 2,
      columnShift: 0,
      reverseRowShift: 1,
      reverseColumnShift: 3,
      edgeRowShift: 2,
      edgeColumnShift: 3
    }],
    [(Direction.Top + MoveType.RotateCornerAfterDouble), {
      rowShift: 4,
      columnShift: 3,
      reverseRowShift: 1,
      reverseColumnShift: 3,
      edgeRowShift: 4,
      edgeColumnShift: 6
    }],
      
    [(Direction.Right + MoveType.TileInLine), {
      columnShift: 1,
      reverseRowShift: 1,
      reverseColumnShift: 3,
      edgeColumnShift: 4
    }],
    [(Direction.Right + MoveType.DoubleInLine), {
      rowShift: -1,
      columnShift: 1,
      edgeColumnShift: 2
    }],
    [(Direction.Right + MoveType.CornerInLine), {
      columnShift: 1,
      reverseColumnShift: 1,
      reverseRowShift: 3,
      edgeColumnShift: 1,
      edgeRowShift: 2,
    }],
    [(Direction.Right + MoveType.CornerOut), {
      rowShift: 2,
      columnShift: -1,
      reverseRowShift: 3,
      reverseColumnShift: 1,
      edgeColumnShift: -1,
      edgeRowShift: 4
    }],
    [(Direction.Right + MoveType.CornerOutDouble), {
      rowShift: 3,
      columnShift: -1,
      reverseRowShift: 3,
      reverseColumnShift: 1,
      edgeColumnShift: -1,
      edgeRowShift: 5
    }],
    [(Direction.Right + MoveType.RotateCorner), {
      rowShift: 0,
      columnShift: -3,
      reverseRowShift: 3,
      reverseColumnShift: 1,
      edgeRowShift: 2,
      edgeColumnShift: -3,
    }],
    [(Direction.Right + MoveType.RotateCornerAfterDouble), {
      rowShift: 3,
      columnShift: -5,
      reverseRowShift: 3,
      reverseColumnShift: 1,
      edgeRowShift: 5,
      edgeColumnShift: -5,
    }],
    
    [(Direction.Down + MoveType.TileInLine), {
      rowShift: 2,
      reverseRowShift: 3,
      reverseColumnShift: 1,
      edgeRowShift: 4
    }],
    [(Direction.Down + MoveType.DoubleInLine), {
      rowShift: 2,
      columnShift: -1,
      edgeRowShift: 2
    }],
    [(Direction.Down + MoveType.CornerInLine), {
      rowShift: 2,
      columnShift: -2,
      reverseRowShift: 1,
      reverseColumnShift: 3,
      edgeRowShift: 2,
      edgeColumnShift: -2
    }],
    [(Direction.Down + MoveType.CornerOut), {
      reverseRowShift: 1,
      columnShift: -4,
      reverseColumnShift: 3,
      edgeColumnShift: -4
    }],
    [(Direction.Down + MoveType.CornerOutDouble), {
      columnShift: -5,
      reverseRowShift: 1,
      reverseColumnShift: 3,
      edgeColumnShift: -5
    }],
    [(Direction.Down + MoveType.RotateCorner), {
      rowShift: -2,
      columnShift: -2,
      reverseRowShift: 1,
      reverseColumnShift: 3,
      edgeRowShift: -2,
      edgeColumnShift: -2,
    }],
    [(Direction.Down + MoveType.RotateCornerAfterDouble), {
      rowShift: -4,
      columnShift: -5,
      reverseRowShift: 1,
      reverseColumnShift: 3,
      edgeRowShift: -4,
      edgeColumnShift: -5,
    }],
  ]);
}
