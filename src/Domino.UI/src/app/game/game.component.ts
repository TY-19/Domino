import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TileComponent } from "../tile/tile.component";
import { GameService } from './game.service';
import { GameState } from '../_models/gameState';
import { JsonPipe } from '@angular/common';
import { DominoTilePosition } from '../_models/dominoTilePosition';

enum Direction {
  Top = 10,
  Down = 20,
  Left = 30,
  Right = 40
}
enum MoveType {
  TileInLine = 1,
  DoubleInLine = 2,
  CornerInLine = 3,
  CornerOut = 4,
  CornerOutDouble = 5,
  RotateCorner = 6,
  RotateCornerAfterDouble = 7
}

@Component({
  selector: 'Dom-game',
  standalone: true,
  imports: [
    JsonPipe,
    TileComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  @ViewChild('GameTable') GameTable!: ElementRef<HTMLDivElement>;
  //game: GameState = null!;
  game: GameState = {
    id: 638614877478557700,
    message: "Default",
    set: {},
    table: {
      tilesOnTable: [
        {
          tile: {
            a: 0,
            b: 2,
            tileId: "02",
            isDouble: false
          },
          position: -9,
          contactEdge: 0
        },
        {
          tile: {
            a: 0,
            b: 0,
            tileId: "00",
            isDouble: true
          },
          position: -8,
          contactEdge: 0
        },
        {
          tile: {
            a: 0,
            b: 4,
            tileId: "04",
            isDouble: false
          },
          position: -7,
          contactEdge: 4
        },
        {
          tile: {
            a: 4,
            b: 4,
            tileId: "44",
            isDouble: true
          },
          position: -6,
          contactEdge: 4
        },
        {
          tile: {
            a: 4,
            b: 6,
            tileId: "46",
            isDouble: false
          },
          position: -5,
          contactEdge: 6
        },
        {
          tile: {
            a: 2,
            b: 6,
            tileId: "26",
            isDouble: false
          },
          position: -4,
          contactEdge: 2
        },
        {
          tile: {
            a: 1,
            b: 2,
            tileId: "12",
            isDouble: false
          },
          position: -3,
          contactEdge: 1
        },
        {
          tile: {
            a: 0,
            b: 1,
            tileId: "01",
            isDouble: false
          },
          position: -2,
          contactEdge: 0
        },
        {
          tile: {
            a: 0,
            b: 3,
            tileId: "03",
            isDouble: false
          },
          position: -1,
          contactEdge: 3
        },
        {
          tile: {
            a: 3,
            b: 3,
            tileId: "33",
            isDouble: true
          },
          position: 0,
          contactEdge: -1
        },
        {
          tile: {
            a: 1,
            b: 3,
            tileId: "13",
            isDouble: false
          },
          position: 1,
          contactEdge: 3
        },
        {
          tile: {
            a: 1,
            b: 6,
            tileId: "16",
            isDouble: false
          },
          position: 2,
          contactEdge: 1
        },
        {
          tile: {
            a: 0,
            b: 6,
            tileId: "06",
            isDouble: false
          },
          position: 3,
          contactEdge: 6
        },
        {
          tile: {
            a: 0,
            b: 5,
            tileId: "05",
            isDouble: false
          },
          position: 4,
          contactEdge: 0
        },
        {
          tile: {
            a: 5,
            b: 5,
            tileId: "55",
            isDouble: true
          },
          position: 5,
          contactEdge: 5
        },
        {
          tile: {
            a: 3,
            b: 5,
            tileId: "35",
            isDouble: false
          },
          position: 6,
          contactEdge: 5
        },
        // {
        //   tile: {
        //     a: 3,
        //     b: 3,
        //     tileId: "33",
        //     isDouble: true
        //   },
        //   position: 7,
        //   contactEdge: 3
        // },
        {
          tile: {
            a: 3,
            b: 6,
            tileId: "36",
            isDouble: false
          },
          position: 7,
          contactEdge: 3
        },
        {
          tile: {
            a: 6,
            b: 6,
            tileId: "66",
            isDouble: true
          },
          position: 8,
          contactEdge: 6
        },
        {
          tile: {
            a: 5,
            b: 6,
            tileId: "56",
            isDouble: false
          },
          position: 9,
          contactEdge: 6
        },
        {
          tile: {
            a: 2,
            b: 5,
            tileId: "25",
            isDouble: false
          },
          position: 10,
          contactEdge: 5
        },
        {
          tile: {
            a: 2,
            b: 2,
            tileId: "22",
            isDouble: true
          },
          position: 11,
          contactEdge: 2
        },
        {
          tile: {
            a: 2,
            b: 3,
            tileId: "23",
            isDouble: false
          },
          position: 12,
          contactEdge: 2
        },
      ]
    },
    player: {
      name: "Name",
      hand: [
        {
          a: 2,
          b: 4,
          tileId: "24",
          isDouble: false
        }
      ]
    },
    opponent: {
      name: "AI",
      hand: [
        {
          a: 1,
          b: 5,
          tileId: "15",
          isDouble: false
        },
        {
          a: 5,
          b: 6,
          tileId: "56",
          isDouble: false
        }
      ]
    },
    log: {
      events: [
        {
          moveNumber: 1,
          playerName: "Name",
          type: 1,
          tile: {
            a: 4,
            b: 4,
            tileId: "44",
            isDouble: true
          },
          nextToTile: null
        },
        {
          moveNumber: 2,
          playerName: "AI",
          type: 1,
          tile: {
            a: 4,
            b: 6,
            tileId: "46",
            isDouble: false
          },
          nextToTile: null
        },
        {
          moveNumber: 3,
          playerName: "Name",
          type: 1,
          tile: {
            a: 2,
            b: 6,
            tileId: "26",
            isDouble: false
          },
          nextToTile: null
        },
        {
          moveNumber: 4,
          playerName: "AI",
          type: 1,
          tile: {
            a: 1,
            b: 2,
            tileId: "12",
            isDouble: false
          },
          nextToTile: null
        },
        {
          moveNumber: 5,
          playerName: "Name",
          type: 1,
          tile: {
            a: 0,
            b: 1,
            tileId: "01",
            isDouble: false
          },
          nextToTile: null
        },
        {
          moveNumber: 6,
          playerName: "AI",
          type: 1,
          tile: {
            a: 0,
            b: 3,
            tileId: "03",
            isDouble: false
          },
          nextToTile: null
        },
        {
          moveNumber: 7,
          playerName: "Name",
          type: 1,
          tile: {
            a: 3,
            b: 3,
            tileId: "33",
            isDouble: true
          },
          nextToTile: null
        },
        {
          moveNumber: 8,
          playerName: "AI",
          type: 1,
          tile: {
            a: 1,
            b: 3,
            tileId: "13",
            isDouble: false
          },
          nextToTile: null
        },
        {
          moveNumber: 9,
          playerName: "Name",
          type: 1,
          tile: {
            a: 0,
            b: 4,
            tileId: "04",
            isDouble: false
          },
          nextToTile: null
        },
        {
          moveNumber: 10,
          playerName: "AI",
          type: 1,
          tile: {
            a: 1,
            b: 6,
            tileId: "16",
            isDouble: false
          },
          nextToTile: null
        },
        {
          moveNumber: 11,
          playerName: "Name",
          type: 1,
          tile: {
            a: 0,
            b: 6,
            tileId: "06",
            isDouble: false
          },
          nextToTile: {
            a: 1,
            b: 6,
            tileId: "16",
            isDouble: false
          }
        }
      ]
    }
  };
  tileDispays: Map<number, TileDisplay> = new Map<number, TileDisplay>();
  private leftEdgePos: EdgePosition = {
    type: EdgeType.Left,
    column: 0,
    row: 0,
    direction: Direction.Left
  };
  private rightEdgePos: EdgePosition = {
    type: EdgeType.Right,
    column: 0,
    row: 0,
    direction: Direction.Right
  };
  constructor(private gameService: GameService) {
    
  }
  private columnsNumber: number = 0;
  private rowsNumber: number = 24;
  ngOnInit() {
    if(this.game === null) {
      this.start();
    }
    this.columnsNumber = this.calculateColumnsNumber();
    this.populateTileDisplays();
  }
  start() {
    this.gameService.startGame()
      .subscribe(gs => this.game = gs);
  }
  private calculateColumnsNumber(): number {
    const pixelsInVh = window.innerHeight / 100;
    const columnWidth = 3 * pixelsInVh;
    const gameTableWidth = window.innerWidth * 10 / 12 - 20;
    return Math.floor(gameTableWidth / columnWidth);
  }
  populateTileDisplays() {
    let sortedTilePositions = this.game.table.tilesOnTable.sort((a, b) => {
      return Math.abs(a.position) - Math.abs(b.position);
    });
    for(let tilePosition of sortedTilePositions) {
      this.calculatePositions(tilePosition);
    }
  }
  buildStyle(styleProp: StyleProp): string {
    let style: string = "grid-row-start: " + styleProp.startRow + ";"
      + " grid-column-start: " + styleProp.startColumn + ";";
    if(styleProp.transformX !== 1 || styleProp.transformY !== 1) {
      style += " transform: scaleX(" + styleProp.transformX + ") scaleY(" + styleProp.transformY + ");";
    }
    return style;
  }
  private calculatePositions(tilePosition: DominoTilePosition) {
    if(tilePosition.position === 0) {
      this.getStartTilePosition(tilePosition);
    } else {
      let edgeType: EdgeType = tilePosition.position < 0 ? EdgeType.Left : EdgeType.Right;
      let edgePosition = this.getEdgePos(edgeType);
      this.getMove(edgePosition, tilePosition);
    }
  }
  private getStartTilePosition(tilePosition: DominoTilePosition) {
    let elemStyle: StyleProp = {
      startRow: Math.floor(this.rowsNumber / 2),
      startColumn: Math.floor(this.columnsNumber / 2),
      transformX: 1,
      transformY: 1
    };
    if(tilePosition.tile.isDouble) {
      elemStyle.startRow--;
      this.leftEdgePos.row = elemStyle.startRow + 1;
      this.leftEdgePos.column = elemStyle.startColumn;
      this.leftEdgePos.direction = Direction.Left;
      this.rightEdgePos.row = elemStyle.startRow + 1;
      this.rightEdgePos.column = elemStyle.startColumn + 1;
      this.rightEdgePos.direction = Direction.Right;
    }
    else {
      elemStyle.startColumn--;
      this.leftEdgePos.row = elemStyle.startRow;
      this.leftEdgePos.column = elemStyle.startColumn;
      this.leftEdgePos.direction = Direction.Left;
      this.rightEdgePos.row = elemStyle.startRow;
      this.rightEdgePos.column = elemStyle.startColumn + 3;
      this.rightEdgePos.direction = Direction.Right;
    }
    this.setTileDisplays(elemStyle, !tilePosition.tile.isDouble, tilePosition);
  }
  
  placeTileOnTable(direction: Direction, moveType: MoveType, edgePosition: EdgePosition, tilePosition: DominoTilePosition) {
    const styleShifts = GameComponent.positionShifts.get(direction + moveType);
    const edgeShift = GameComponent.edgeShifts.get(direction + moveType);
    if(!styleShifts || ! edgeShift) {
      return;
    }
    this.changeDirection(edgePosition, edgeShift.direction);
    this.placeTile(edgePosition, tilePosition, styleShifts);
    this.updateEdgePosition(edgePosition, edgeShift);
  }
  private static positionShifts: Map<number, StylePropShifts> = new Map<number, StylePropShifts>([
    [(Direction.Left + MoveType.TileInLine), {
      isHorizontal: true,
      columnShift: -4,
      reverseColumnShift: 3,
      reverseTransformX: -1, }],
    [(Direction.Left + MoveType.DoubleInLine), {
      isHorizontal: false,
      rowShift: -1,
      columnShift: -2
    }],
    [(Direction.Left + MoveType.CornerInLine), {
      isHorizontal: false,
      rowShift: -2,
      columnShift: -2,
      reverseRowShift: 3,
      reverseTransformY: -1,
    }],
    [(Direction.Left + MoveType.CornerOut), {
      isHorizontal: false,
      rowShift: -4,
      reverseRowShift: 3,
      reverseTransformY: -1,
    }],
    [(Direction.Left + MoveType.CornerOutDouble), {
      isHorizontal: false,
      rowShift: -5,
      reverseRowShift: 3,
      reverseTransformY: -1,
    }],
    [(Direction.Right + MoveType.TileInLine), {
      isHorizontal: true,
      columnShift: 1,
      reverseColumnShift: 3,
      reverseTransformX: -1
    }],
    [(Direction.Right + MoveType.DoubleInLine), {
      isHorizontal: false,
      rowShift: -1,
      columnShift: 1
    }],
    [(Direction.Right + MoveType.CornerInLine), {
      isHorizontal: false,
      columnShift: 1,
      reverseRowShift: 3,
      reverseTransformY: -1
    }],
    [(Direction.Right + MoveType.CornerOut), {
      isHorizontal: false,
      columnShift: -1,
      rowShift: 2,
      reverseRowShift: 3,
      reverseTransformY: -1
    }],
    [(Direction.Right + MoveType.CornerOutDouble), {
      isHorizontal: false,
      columnShift: -1,
      rowShift: 3,
      reverseRowShift: 3,
      reverseTransformY: -1
    }],
    [(Direction.Top + MoveType.TileInLine), {
      isHorizontal: false,
      rowShift: -4,
      reverseRowShift: 3,
      reverseTransformY: -1,
    }],
    [(Direction.Top + MoveType.DoubleInLine), {
      isHorizontal: true,
      rowShift: -2,
      columnShift: -1
    }],
    [(Direction.Top + MoveType.CornerInLine), {
      isHorizontal: true,
      rowShift: -2,
      reverseRowShift: 3,
      reverseTransformX: -1,
    }],
    [(Direction.Top + MoveType.CornerOut), {
      isHorizontal: true,
      columnShift: 2,
      reverseColumnShift: 3,
      reverseTransformX: -1,
    }],
    [(Direction.Top + MoveType.CornerOutDouble), {
      isHorizontal: true,
      columnShift: 3,
      reverseColumnShift: 3,
      reverseTransformX: -1,
    }],
    [(Direction.Down + MoveType.TileInLine), {
      isHorizontal: false,
      rowShift: 2,
      reverseRowShift: 3,
      reverseTransformY: -1,
    }],
    [(Direction.Down + MoveType.DoubleInLine), {
      isHorizontal: true,
      rowShift: 2,
      columnShift: -1,
    }],
    [(Direction.Down + MoveType.CornerInLine), {
      isHorizontal: true,
      rowShift: 2,
      columnShift: -2,
      reverseColumnShift: 3,
      reverseTransformX: -1
    }],
    [(Direction.Down + MoveType.CornerOut), {
      isHorizontal: true,
      columnShift: -4,
      reverseTransformX: 1
    }],
    [(Direction.Down + MoveType.CornerOutDouble), {
      isHorizontal: true,
      columnShift: -5,
      reverseColumnShift: 3,
      reverseTransformX: -1
    }]
  ]);
  private static edgeShifts: Map<number, EdgeShift> = new Map<number, EdgeShift>([
    [(Direction.Left + MoveType.TileInLine), {
      columnShift: -4,
    }],
    [(Direction.Left + MoveType.DoubleInLine), {
      columnShift: -2,
    }],
    [(Direction.Left + MoveType.CornerInLine), {
      direction: Direction.Top,
      rowShift: -2,
      columnShift: -2
    }],
    [(Direction.Left + MoveType.CornerOut), {
      direction: Direction.Top,
      rowShift: -4
    }],
    [(Direction.Left + MoveType.CornerOutDouble), {
      direction: Direction.Top,
      rowShift: -5
    }],
    [(Direction.Right + MoveType.TileInLine), {
      direction: Direction.Right,
      columnShift: 4
    }],
    [(Direction.Right + MoveType.DoubleInLine), {
      direction: Direction.Right,
      columnShift: 2
    }],
    [(Direction.Right + MoveType.CornerInLine), {
      direction: Direction.Down,
      columnShift: 1,
      rowShift: 2
    }],
    [(Direction.Right + MoveType.CornerOut), {
      direction: Direction.Down,
      columnShift: -1,
      rowShift: 4
    }],
    [(Direction.Right + MoveType.CornerOutDouble), {
      direction: Direction.Down,
      columnShift: -1,
      rowShift: 5
    }],
    [(Direction.Top + MoveType.TileInLine), {
      direction: Direction.Top,
      rowShift: -4
    }],
    [(Direction.Top + MoveType.DoubleInLine), {
      direction: Direction.Top,
      rowShift: -2
    }],
    [(Direction.Top + MoveType.CornerInLine), {
      direction: Direction.Right,
      rowShift: -2,
      columnShift: 3
    }],
    [(Direction.Top + MoveType.CornerOut), {
      direction: Direction.Right,
      columnShift: 5
    }],
    [(Direction.Top + MoveType.CornerOutDouble), {
      direction: Direction.Right,
      columnShift: 6
    }],
    [(Direction.Down + MoveType.TileInLine), {
      direction: Direction.Down,
      rowShift: 4
    }],
    [(Direction.Down + MoveType.DoubleInLine), {
      direction: Direction.Down,
      rowShift: 2
    }],
    [(Direction.Down + MoveType.CornerInLine), {
      direction: Direction.Left,
      rowShift: 2,
      columnShift: -2
    }],
    [(Direction.Down + MoveType.CornerOut), {
      direction: Direction.Left,
      columnShift: -4
    }],
    [(Direction.Down + MoveType.CornerOutDouble), {
      direction: Direction.Left,
      columnShift: -5
    }],
  ]);

  private placeTile(edgePosition: EdgePosition, tilePosition: DominoTilePosition,
    stylePropShift: StylePropShifts) {
    let styleProp: StyleProp = {
      startRow: edgePosition.row + (stylePropShift.rowShift ?? 0),
      startColumn: edgePosition.column + (stylePropShift.columnShift ?? 0),
      transformX: 1,
      transformY: 1
    };
    if(this.needReverseTile(edgePosition, tilePosition)) {
      styleProp.startRow += (stylePropShift.reverseRowShift ?? 0);
      styleProp.startColumn += (stylePropShift.reverseColumnShift ?? 0);
      styleProp.transformX = stylePropShift.reverseTransformX ?? 1;
      styleProp.transformY = stylePropShift.reverseTransformY ?? 1;
    }
    this.setTileDisplays(styleProp, stylePropShift.isHorizontal, tilePosition);
  }
  private needReverseTile(edgePosition: EdgePosition, tilePosition: DominoTilePosition): boolean {
    if(tilePosition.tile.isDouble) {
      return false;
    }
    let isContactedSideA: boolean = tilePosition.contactEdge === tilePosition.tile.a;
    if (isContactedSideA) {
      return edgePosition.direction === Direction.Left || edgePosition.direction === Direction.Top;
    } else {
      return edgePosition.direction === Direction.Right || edgePosition.direction === Direction.Down;
    }
  }
  private setTileDisplays(styleProps: StyleProp, isHorizontal: boolean, tilePosition: DominoTilePosition) {
    let tileDisplay: TileDisplay = {
      id: tilePosition.tile.tileId,
      styleProps: styleProps,
      isHorizontal: isHorizontal,
      tilePosition: tilePosition
    };
    this.tileDispays.set(tilePosition.position, tileDisplay); 
  }
  private getEdgePos(edgeType: EdgeType): EdgePosition {
    return edgeType === EdgeType.Left ? this.leftEdgePos : this.rightEdgePos;
  }
  private getPreviousTilePosition(tilePosition: DominoTilePosition): number {
    return tilePosition.position > 0 ? tilePosition.position - 1 : tilePosition.position + 1;
  }
  private isPreviousTileDouble(tilePosition: DominoTilePosition): boolean {
    let previousPosition = this.getPreviousTilePosition(tilePosition);
    let previousTile = this.tileDispays.get(previousPosition);
    return previousTile?.tilePosition.tile.isDouble ?? false;
  }
  private getPreviousTile(tilePosition: DominoTilePosition): DominoTilePosition | undefined {
    let previousPosition = this.getPreviousTilePosition(tilePosition);
    return this.tileDispays.get(previousPosition)?.tilePosition;
  }
  private changeDirection(edgePosition: EdgePosition, direction: Direction | undefined) {
    if(direction) {
      edgePosition.direction = direction;
    }
  }
  private updateEdgePosition(edgePosition: EdgePosition, edgeShift: EdgeShift) {
    edgePosition.row += edgeShift.rowShift ?? 0;
    edgePosition.column += edgeShift.columnShift ?? 0;
  }

  getMove(edgePosition: EdgePosition, tilePosition: DominoTilePosition) {
    let moveType: MoveType = null!;
    if(this.canContinueLine(edgePosition.direction, edgePosition)) {
      moveType = tilePosition.tile.isDouble ? MoveType.DoubleInLine : MoveType.TileInLine;
    } else if(this.canRotateInLine(edgePosition.direction, edgePosition)) {
      if(tilePosition.tile.isDouble) {
        moveType = MoveType.DoubleInLine;
      } else {
        moveType = this.isPreviousTileDouble(tilePosition)
          ? MoveType.CornerOutDouble
          : MoveType.CornerInLine;
      }
    } else {
      if(tilePosition.tile.isDouble) {
        let tileDisplay = this.tileDispays.get(this.getPreviousTilePosition(tilePosition));
        this.rotateCorner(edgePosition, tileDisplay);
        moveType = tilePosition.tile.isDouble ? MoveType.DoubleInLine : MoveType.TileInLine;
      } else {
        moveType = this.isPreviousTileDouble(tilePosition)
          ? MoveType.CornerOutDouble
          : MoveType.CornerOut;
      }
    }
    this.placeTileOnTable(edgePosition.direction, moveType, edgePosition, tilePosition);
  }
  private canContinueLine(direction: Direction, edgePosition: EdgePosition): boolean {
    switch (direction) {
      case Direction.Top:
        return edgePosition.row > 5;
      case Direction.Down:
        return edgePosition.row < this.rowsNumber - 4;
      case Direction.Left:
        return edgePosition.column > 5;
      case Direction.Right:
        return edgePosition.column < this.columnsNumber - 4;
    }
  }
  private canRotateInLine(direction: Direction, edgePosition: EdgePosition): boolean {
    switch (direction) {
      case Direction.Top:
        return edgePosition.row > 3;
      case Direction.Down:
        return edgePosition.row <= this.rowsNumber - 3;
      case Direction.Left:
        return edgePosition.column > 3;
      case Direction.Right:
        return edgePosition.column <= this.columnsNumber - 3;
    }
  }
  rotateCorner(edgePosition: EdgePosition, tileDisplay: TileDisplay | undefined) {
    if(!tileDisplay) {
      return;
    }
    let moveType: MoveType = this.isPreviousTileDouble(tileDisplay.tilePosition)
      ? MoveType.RotateCornerAfterDouble
      : MoveType.RotateCorner;
    let direction: Direction = edgePosition.direction;
    let rotateShift = GameComponent.rotateShifts.get(direction + moveType);
    let rotateEdgeShift = GameComponent.rotateEdgeShifts.get(direction + moveType);
    if(!rotateShift || !rotateEdgeShift) {
      return;
    }
    this.rotateCornerTile(tileDisplay, rotateShift);
    this.adjustEdgeAfterRotation(edgePosition, rotateEdgeShift, tileDisplay);
  }
  private rotateCornerTile(tileDisplay: TileDisplay, tileShift: StylePropShifts) {
    tileDisplay.isHorizontal = tileShift.isHorizontal;
    tileDisplay.styleProps.startRow += tileShift.rowShift ?? 0;
    tileDisplay.styleProps.startColumn += tileShift.columnShift ?? 0;
    tileDisplay.styleProps.transformX *= tileShift.reverseTransformX ?? 1;
    tileDisplay.styleProps.transformY *= tileShift.reverseTransformY ?? 1;
  }
  private adjustEdgeAfterRotation(edgePosition: EdgePosition, edgeShift: EdgeShift,
    tileDisplay: TileDisplay
  ) {
    edgePosition.direction = edgeShift.direction ?? edgePosition.direction;
    edgePosition.row = tileDisplay.styleProps.startRow + (edgeShift.rowShift ?? 0);
    edgePosition.column = tileDisplay.styleProps.startColumn + (edgeShift.columnShift ?? 0);
  }

  private static rotateShifts: Map<number, StylePropShifts> = new Map<number, StylePropShifts>([
    [(Direction.Left + MoveType.RotateCorner), {
      isHorizontal: false,
      rowShift: -2,
      columnShift: 2,
    }],
    [(Direction.Left + MoveType.RotateCornerAfterDouble), {
      isHorizontal: false,
      rowShift: -5,
      columnShift: 4,
    }],
    [(Direction.Top + MoveType.RotateCorner), {
      isHorizontal: true,
      rowShift: 2,
      columnShift: 3,
      reverseTransformX: -1,
    }],
    [(Direction.Top + MoveType.RotateCornerAfterDouble), {
      isHorizontal: true,
      rowShift: 4,
      columnShift: 6,
      reverseTransformX: -1,
    }],
    [(Direction.Right + MoveType.RotateCorner), {
      isHorizontal: false,
    }],
    [(Direction.Right + MoveType.RotateCornerAfterDouble), {
      isHorizontal: false,
      rowShift: 3,
      columnShift: -4,
    }],
    [(Direction.Down + MoveType.RotateCorner), {
      isHorizontal: true,
      columnShift: -2,
      reverseTransformY: -1,
    }],
    [(Direction.Down + MoveType.RotateCornerAfterDouble), {
      isHorizontal: true,
      rowShift: -5,
      columnShift: -5,
      reverseTransformY: -1,
    }],
  ]);
  private static rotateEdgeShifts: Map<number, EdgeShift> = new Map<number, EdgeShift>([
    [(Direction.Left + MoveType.RotateCorner), {
      direction: Direction.Top,
    }],
    [(Direction.Left + MoveType.RotateCornerAfterDouble), {
      direction: Direction.Top,
    }],
    [(Direction.Top + MoveType.RotateCorner), {
      direction: Direction.Right,
    }],
    [(Direction.Top + MoveType.RotateCornerAfterDouble), {
      direction: Direction.Right,
    }],
    [(Direction.Right + MoveType.RotateCorner), {
      direction: Direction.Down,
      rowShift: 2,
      columnShift: 0,
    }],
    [(Direction.Right + MoveType.RotateCornerAfterDouble), {
      direction: Direction.Down,
      rowShift: 2,
      columnShift: 0,
    }],
    [(Direction.Down + MoveType.RotateCorner), {
      direction: Direction.Left,
      rowShift: 0,
      columnShift: 0,
    }],
    [(Direction.Down + MoveType.RotateCornerAfterDouble), {
      direction: Direction.Left,
      rowShift: 0,
      columnShift: 0,
    }],
  ]);
}

enum EdgeType {
  Left,
  Right
}
interface EdgePosition {
  type: EdgeType,
  row: number,
  column: number,
  direction: Direction
}

interface TileDisplay {
  id: string,
  styleProps: StyleProp,
  isHorizontal: boolean,
  tilePosition: DominoTilePosition
}
interface StyleProp {
  startRow: number,
  startColumn: number,
  transformX: number,
  transformY: number
}
interface StylePropShifts {
  isHorizontal: boolean;
  rowShift?: number;
  columnShift?: number;
  reverseRowShift?: number;
  reverseColumnShift?: number;
  reverseTransformX?: number;
  reverseTransformY?: number;
}
interface EdgeShift {
  direction?: Direction;
  rowShift?: number;
  columnShift?: number;
}

