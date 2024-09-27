import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TileComponent } from "../tile/tile.component";
import { GameService } from './game.service';
import { GameState } from '../_models/gameState';
import { JsonPipe } from '@angular/common';
import { DominoTilePosition } from '../_models/dominoTilePosition';

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
      // let tileDisplay: TileDisplay = {
      //   id: tilePosition.tile.tileId,
      //   styleProps: this.calculatePositions(tilePosition),
      //   isHorizontal: this.isHorizontal(tilePosition),
      //   tilePosition: tilePosition
      // };
      // this.tileDispays.set(tilePosition.tile.tileId, tileDisplay); 
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
      switch(edgePosition.direction) {
        case Direction.Left:
          this.getToLeftTilePosition(edgeType, tilePosition);
          break;
        case Direction.Top:
          this.getToTopTilePosition(edgeType, tilePosition);
          break;
        case Direction.Right:
          this.getToRightTilePosition(edgeType, tilePosition);
          break;
        case Direction.Down:
          this.getToDownTilePosition(edgeType, tilePosition);
          break;
      }
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
  

  placeLeftTile(edgePosition: EdgePosition, tilePosition: DominoTilePosition) {
    let styleShifts: StylePropShifts = {
      isHorizontal: true,
      columnShift: -4,
      reverseColumnShift: 3,
      reverseTransformX: -1,
    }
    this.placeTile(edgePosition, tilePosition, styleShifts);
    edgePosition.column -= 4;
  }
  placeLeftDouble(edgePosition: EdgePosition, tilePosition: DominoTilePosition) {
    let styleShifts: StylePropShifts = {
      isHorizontal: false,
      rowShift: -1,
      columnShift: -2
    }
    this.placeTile(edgePosition, tilePosition, styleShifts);
    edgePosition.column -= 2;
  }
  placeLeftCornerInLine(edgePosition: EdgePosition, tilePosition: DominoTilePosition) {
    let styleShifts: StylePropShifts = {
      isHorizontal: false,
      rowShift: -2,
      columnShift: -2,
      reverseRowShift: 3,
      reverseTransformY: -1,
    }
    this.placeTile(edgePosition, tilePosition, styleShifts);
    edgePosition.direction = Direction.Top;
    edgePosition.row -= 2;
    edgePosition.column -= 2;
  }
  placeLeftCornerOnTopDouble(edgePosition: EdgePosition, tilePosition: DominoTilePosition) {
    let styleShifts: StylePropShifts = {
      isHorizontal: false,
      rowShift: -5,
      reverseRowShift: 3,
      reverseTransformY: -1,
    }
    this.placeTile(edgePosition, tilePosition, styleShifts);
    edgePosition.direction = Direction.Top;
    edgePosition.row -= 5;
    edgePosition.column -= 2;
  }
  placeTopTile(edgePosition: EdgePosition, tilePosition: DominoTilePosition) {
    let styleShifts: StylePropShifts = {
      isHorizontal: false,
      rowShift: -4,
      reverseRowShift: 3,
      reverseTransformY: -1,
    }
    this.placeTile(edgePosition, tilePosition, styleShifts);
    edgePosition.direction = Direction.Top;
    edgePosition.row -= 4;
  }
  placeTopDouble(edgePosition: EdgePosition, tilePosition: DominoTilePosition) {
    let styleShifts: StylePropShifts = {
      isHorizontal: true,
      rowShift: -2,
      columnShift: -1,
    }
    this.placeTile(edgePosition, tilePosition, styleShifts);
    edgePosition.direction = Direction.Top;
    edgePosition.row -= 2;
  }
  placeTopCornerInLine(edgePosition: EdgePosition, tilePosition: DominoTilePosition) {
    let styleShifts: StylePropShifts = {
      isHorizontal: true,
      rowShift: -2,
      reverseRowShift: 3,
      reverseTransformX: -1,
    }
    this.placeTile(edgePosition, tilePosition, styleShifts);
    edgePosition.direction = Direction.Right;
    edgePosition.row -= 2;
    edgePosition.column += 3;
  }
  placeTopCornerRightToDouble(edgePosition: EdgePosition, tilePosition: DominoTilePosition) {
    let styleShifts: StylePropShifts = {
      isHorizontal: true,
      columnShift: 3,
      reverseRowShift: 3,
      reverseTransformX: -1,
    }
    this.placeTile(edgePosition, tilePosition, styleShifts);
    edgePosition.direction = Direction.Right;
    // edgePosition.row += 6;
    edgePosition.column += 6;
  }
  placeRightTile(edgePosition: EdgePosition, tilePosition: DominoTilePosition) {
    let styleShifts: StylePropShifts = {
      isHorizontal: true,
      columnShift: 1,
      reverseColumnShift: 3,
      reverseTransformX: -1
    }
    this.placeTile(edgePosition, tilePosition, styleShifts);
    edgePosition.direction = Direction.Right;
    edgePosition.column += 4;
  }
  placeRightDouble(edgePosition: EdgePosition, tilePosition: DominoTilePosition) {
    let styleShifts: StylePropShifts = {
      isHorizontal: false,
      rowShift: -1,
      columnShift: 1
    }
    this.placeTile(edgePosition, tilePosition, styleShifts);
    edgePosition.direction = Direction.Right;
    edgePosition.column += 2;
  }
  placeDownTile(edgePosition: EdgePosition, tilePosition: DominoTilePosition) {
    let styleShifts: StylePropShifts = {
      isHorizontal: false,
      rowShift: 1,
      columnShift: -1,
      reverseRowShift: -3,
      reverseTransformY: -1,
    }
    this.placeTile(edgePosition, tilePosition, styleShifts);
    edgePosition.direction = Direction.Down;
    edgePosition.row += 4;
  }
  placeDownDouble(edgePosition: EdgePosition, tilePosition: DominoTilePosition) {
    let styleShifts: StylePropShifts = {
      isHorizontal: true,
      rowShift: 2,
      columnShift: -2,
    }
    this.placeTile(edgePosition, tilePosition, styleShifts);
    edgePosition.direction = Direction.Down;
    edgePosition.row = 2;
  }

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
  private setEdgePos(edgePosition: EdgePosition): void {
    if (edgePosition.type === EdgeType.Left) {
      this.leftEdgePos = edgePosition;
    } else {
      this.rightEdgePos = edgePosition;
    }
  }
  private getPreviousTilePosition(tilePosition: DominoTilePosition): number {
    return tilePosition.position > 0 ? tilePosition.position - 1 : tilePosition.position + 1;
  }
  

  private getToLeftTilePosition(edgeType: EdgeType, tilePosition: DominoTilePosition) {
    let edgePosition = this.getEdgePos(edgeType);
    if(edgePosition.column > 4)
    {
      if(tilePosition.tile.isDouble) {
        this.placeLeftDouble(edgePosition, tilePosition);
      } else {
        this.placeLeftTile(edgePosition, tilePosition);
      }
    }
    else if(edgePosition.column > 2 && tilePosition.tile.isDouble)
    {
      this.placeLeftDouble(edgePosition, tilePosition);
      edgePosition.row--;
    }
    else if(edgePosition.column > 3) {
      let previousTile = this.tileDispays.get(this.getPreviousTilePosition(tilePosition));
      if(previousTile?.tilePosition.tile.isDouble === true) {
        this.placeLeftCornerOnTopDouble(edgePosition, tilePosition);
      } else {
        this.placeLeftCornerInLine(edgePosition, tilePosition);
      }
    }
    else
    {
      if(tilePosition.tile.isDouble) {
        this.placeTopDouble(edgePosition, tilePosition);
      } else {
        this.placeTopTile(edgePosition, tilePosition);
      }
    }
  }
  private getToTopTilePosition(edgeType: EdgeType, tilePosition: DominoTilePosition) {
    let edgePosition = this.getEdgePos(edgeType);
    if(edgePosition.row > 4)
    {
      if(tilePosition.tile.isDouble) {
        this.placeTopDouble(edgePosition, tilePosition);
      } else {
        this.placeTopTile(edgePosition, tilePosition);
      }
    } else if(edgePosition.row > 2 && tilePosition.tile.isDouble) {
        this.placeTopDouble(edgePosition, tilePosition);
        edgePosition.row--;
    } else if(edgePosition.row > 3) {
      let previousTile = this.tileDispays.get(this.getPreviousTilePosition(tilePosition));
      if(previousTile?.tilePosition.tile.isDouble === true) {
        this.placeTopCornerRightToDouble(edgePosition, tilePosition);
      } else {
        this.placeTopCornerInLine(edgePosition, tilePosition);
      }
    }
    else
    {
      edgePosition.column += 1;
      if(tilePosition.tile.isDouble) {
        this.placeRightDouble(edgePosition, tilePosition);
      } else {
        this.placeRightTile(edgePosition, tilePosition);
      }
      // if(tilePosition.tile.isDouble) {
      //   elemStyle.startRow = edgePosition[0] - 1;
      //   elemStyle.startColumn = edgePosition[1] + 2;
      //   this.setEdgePosition(edgeType, [elemStyle.startRow + 1, elemStyle.startColumn + 1, Direction.Right]);
      //   this.orientation.push([tilePosition.position, 0]);
      //   // let cornerPosition: number = tilePosition.position < 0
      //   //   ? tilePosition.position + 1 : tilePosition.position - 1;
      //   // this.rotateCornerTile(cornerPosition, "left-up");
      // } else {
      //   elemStyle.startRow = edgePosition[0] - 2;
      //   elemStyle.startColumn = edgePosition[1] + 2;
      //   this.setEdgePosition(edgeType, [elemStyle.startRow, elemStyle.startColumn, Direction.Right]);
      //   this.orientation.push([tilePosition.position, 0]);
      //   if(tilePosition.contactEdge !== tilePosition.tile.b) {
      //     elemStyle.transformX = 1;
      //     elemStyle.transformY = -1;
      //     elemStyle.startRow += 3;
      //   }
      // }
    }
  }
  private getToRightTilePosition(edgeType: EdgeType, tilePosition: DominoTilePosition) {
    let edgePosition = this.getEdgePos(edgeType);
    if(edgePosition.column < this.columnsNumber - 4)
    {
      if(tilePosition.tile.isDouble) {
        this.placeRightDouble(edgePosition, tilePosition);
      } else {
        this.placeRightTile(edgePosition, tilePosition);
      }
    }
    else if(edgePosition.column <= this.columnsNumber - 2 && tilePosition.tile.isDouble)
    {
    //   elemStyle.startRow = edgePosition.row - 1;
    //   elemStyle.startColumn = edgePosition.column + 1;
    //   let tileDisplay: TileDisplay = {
    //     id: tilePosition.tile.tileId,
    //     styleProps: {
    //       startRow: elemStyle.startRow,
    //       startColumn: elemStyle.startColumn,
    //       transformX: elemStyle.transformX,
    //       transformY: elemStyle.transformY
    //     },
    //     isHorizontal: false,
    //     tilePosition: tilePosition
    //   };
    //   this.tileDispays.set(tilePosition.position, tileDisplay);
    //   this.setEdgePosition(edgeType, [elemStyle.startRow + 3, elemStyle.startColumn, Direction.Down]);
    } else {
    //   if(tilePosition.tile.isDouble) {
    //     elemStyle.startRow = edgePosition.row + 2;
    //     elemStyle.startColumn = edgePosition.column - 2;
    //     this.setEdgePosition(edgeType, [elemStyle.startRow + 1, elemStyle.startColumn + 1, Direction.Down]);
    //     this.orientation.push([tilePosition.position, 1]);
    //     // let cornerPosition: number = tilePosition.position < 0
    //     //   ? tilePosition.position + 1 : tilePosition.position - 1;
    //     // this.rotateCornerTile(cornerPosition, "left-up");
    //   } else {
    //     elemStyle.startRow = edgePosition.row + 2;
    //     elemStyle.startColumn = edgePosition.column - 1;
    //     this.setEdgePosition(edgeType, [elemStyle.startRow, elemStyle.startColumn, Direction.Down]);
    //     this.orientation.push([tilePosition.position, 1]);
    //     if(tilePosition.contactEdge !== tilePosition.tile.b) {
    //       elemStyle.transformX = 1;
    //       elemStyle.transformY = -1;
    //       elemStyle.startRow += 3;
    //     }
    //   }
    }
  }
  private getToDownTilePosition(edgeType: EdgeType, tilePosition: DominoTilePosition) {
    let edgePosition = this.getEdgePos(edgeType);
    if(edgePosition.row < this.rowsNumber - 4)
    {
      if(tilePosition.tile.isDouble) {
        this.placeDownDouble(edgePosition, tilePosition);
      } else {
        this.placeDownTile(edgePosition, tilePosition);
      }
      // elemStyle.startRow = tilePosition.tile.isDouble ? edgePosition[0] + 1 : edgePosition[0] + 1;
      // elemStyle.startColumn = tilePosition.tile.isDouble ? edgePosition[1] - 1 : edgePosition[1];
      // let edgeColumn = tilePosition.tile.isDouble ? elemStyle.startColumn + 1 : elemStyle.startColumn;
      // let edgeRow = tilePosition.tile.isDouble ? elemStyle.startRow + 1 : elemStyle.startRow + 3;
      // this.setEdgePosition(edgeType, [edgeRow, edgeColumn, Direction.Down]);
      // if(tilePosition.contactEdge !== tilePosition.tile.a) {
      //   elemStyle.transformX = 1;
      //   elemStyle.transformY = -1;
      //   elemStyle.startRow += 3;
      // }
      // let tileDisplay: TileDisplay = {
      //   id: tilePosition.tile.tileId,
      //   styleProps: {
      //     startRow: elemStyle.startRow,
      //     startColumn: elemStyle.startColumn,
      //     transformX: elemStyle.transformX,
      //     transformY: elemStyle.transformY
      //   },
      //   isHorizontal: tilePosition.tile.isDouble,
      //   tilePosition: tilePosition
      // };
      // this.tileDispays.set(tilePosition.position, tileDisplay);
    }
    else if(edgePosition.row <= this.rowsNumber - 2 && tilePosition.tile.isDouble)
    {
      // elemStyle.startRow = edgePosition[0] + 1;
      // elemStyle.startColumn = edgePosition[1] - 1;
      // let tileDisplay: TileDisplay = {
      //   id: tilePosition.tile.tileId,
      //   styleProps: {
      //     startRow: elemStyle.startRow,
      //     startColumn: elemStyle.startColumn,
      //     transformX: elemStyle.transformX,
      //     transformY: elemStyle.transformY
      //   },
      //   isHorizontal: true,
      //   tilePosition: tilePosition
      // };
      // this.tileDispays.set(tilePosition.position, tileDisplay);
      // this.setEdgePosition(edgeType, [elemStyle.startRow, elemStyle.startColumn, Direction.Left]);
    }
    else
    {
      // if(tilePosition.tile.isDouble) {
      //   elemStyle.startRow = edgePosition[0] - 2;
      //   elemStyle.startColumn = edgePosition[1] - 2;
      //   this.setEdgePosition(edgeType, [elemStyle.startRow + 1, elemStyle.startColumn, Direction.Left]);
      //   this.orientation.push([tilePosition.position, 0]);
      //   let cornerPosition: number = tilePosition.position < 0
      //     ? tilePosition.position + 1 : tilePosition.position - 1;
      //   this.rotateCornerTile(cornerPosition, "left-up");
      // } else {
      //   elemStyle.startRow = edgePosition[0] - 1;
      //   elemStyle.startColumn = edgePosition[1] - 4;
      //   this.setEdgePosition(edgeType, [elemStyle.startRow, elemStyle.startColumn, Direction.Left]);
      //   this.orientation.push([tilePosition.position, 0]);
      //   if(tilePosition.contactEdge !== tilePosition.tile.b) {
      //     elemStyle.transformX = 1;
      //     elemStyle.transformY = -1;
      //     elemStyle.startRow += 3;
      //   }
      // }
    }
  }

  private rotateCornerTile(position: number, type: string) {
    switch(type) {
      case "left-up":
        let tilePosition = this.game.table.tilesOnTable.find(t => t.position === position);
        let previousPosition = position > 0 ? position - 1 : position + 1;
        let previousTilePosition = this.game.table.tilesOnTable.find(t => t.position === previousPosition);
        if(tilePosition) {
          let tileDisplay = this.tileDispays.get(tilePosition.position);
          if(tileDisplay) {
            if(previousTilePosition?.tile.isDouble) {
              if(tilePosition.contactEdge === tilePosition.tile.a) {
                tileDisplay.isHorizontal = false;
                tileDisplay.styleProps.transformY *= -1;
                tileDisplay.styleProps.startRow += 1;
              } else {
                tileDisplay.isHorizontal = false;
                tileDisplay.styleProps.startRow -= 5;
                tileDisplay.styleProps.startColumn += 4;
              }
            } else {
              if(tilePosition.contactEdge === tilePosition.tile.a) {
                tileDisplay.isHorizontal = false;
                tileDisplay.styleProps.transformY *= -1;
                tileDisplay.styleProps.startRow += 1;
              } else {
                tileDisplay.isHorizontal = false;
                tileDisplay.styleProps.startRow -= 2;
                tileDisplay.styleProps.startColumn += 2;
              }
            }
          }
        }
        break;
      default:
        break;
    }
  }
}
enum Direction {
  Top,
  Down,
  Left,
  Right
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
