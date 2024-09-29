import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { TileComponent } from "../tile/tile.component";
import { GameService } from './game.service';
import { GameState } from '../_models/gameState';
import { JsonPipe } from '@angular/common';
import { DominoTilePosition } from '../_models/dominoTilePosition';
import { PositioningRules } from './positioningRules';
import { TestGame } from './testGame';
import { MoveType } from './enums/moveType';
import { Direction } from './enums/direction';

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
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.columnsNumber = this.calculateColumnsNumber();
    this.populateTileDisplays();
  }

  @ViewChild('GameTable') GameTable!: ElementRef<HTMLDivElement>;
  //game: GameState = null!;
  positioningRules: PositioningRules = new PositioningRules();
  game: GameState = (new TestGame()).getGame();
  
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
    // this.logTileDisplays();
  }
  logTileDisplays() {
    for(let td of this.tileDispays) {
      console.log(td[1].tilePosition.tile);
      console.log(td[1].direction);
    }
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
      this.calculateDisplayParameters(tilePosition);
    }
  }
  buildStyle(styleProp: StyleProp): string {
    let style: string = "grid-row-start: " + styleProp.startRow + ";"
      + " grid-column-start: " + styleProp.startColumn + ";";
    if(styleProp.rotate === true) {
      style += " transform: rotate(180deg)";
    }
    return style;
  }
  private calculateDisplayParameters(tilePosition: DominoTilePosition) {
    if(tilePosition.position === 0) {
      this.getStartTilePosition(tilePosition);
    } else {
      let edgeType: EdgeType = tilePosition.position < 0 ? EdgeType.Left : EdgeType.Right;
      let edgePosition = this.getEdgePosition(edgeType);
      let move = this.getMove(edgePosition, tilePosition);
      console.log("tile: " + tilePosition.tile.tileId + "\tdirection: " + edgePosition.direction + "\tmove: " + move)
      this.placeTileOnTable(edgePosition.direction, move, edgePosition, tilePosition);
    }
  }
  
  private getStartTilePosition(tilePosition: DominoTilePosition) {
    let elemStyle: StyleProp = {
      startRow: Math.floor(this.rowsNumber / 2),
      startColumn: Math.floor(this.columnsNumber / 2),
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
    let direction = Direction.Left;
    this.setTileDisplays(elemStyle, !tilePosition.tile.isDouble, tilePosition, direction);
  }
  private getEdgePosition(edgeType: EdgeType): EdgePosition {
    return edgeType === EdgeType.Left ? this.leftEdgePos : this.rightEdgePos;
  }
  getMove(edgePosition: EdgePosition, tilePosition: DominoTilePosition): MoveType {
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
        let previousTileDisplay = this.getPreviousTile(tilePosition);
        moveType = this.isPreviousTileDouble(previousTileDisplay?.tilePosition!)
          ? MoveType.RotateCornerAfterDouble
          : MoveType.RotateCorner;
        moveType += MoveType.DoubleInLine;
      } else {
        moveType = this.isPreviousTileDouble(tilePosition)
          ? MoveType.CornerOutDouble
          : MoveType.CornerOut;
      }
    }
    return moveType;
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
  
  placeTileOnTable(direction: Direction, moveType: MoveType, edgePosition: EdgePosition, tilePosition: DominoTilePosition) {
    if(moveType >= 100) {
      let rotateMove: MoveType = moveType - (moveType % 100);
      let startDirection: Direction = direction;
      if(startDirection < 0) {
        startDirection = 4;
      }
      let previousTile: TileDisplay = this.getPreviousTile(tilePosition);
      this.rotateCorner(startDirection, edgePosition, previousTile);
      moveType -= rotateMove;
      direction++;
      if(direction > 4) {
        direction = 1;
      }
    }
    const styleShifts = this.positioningRules.positionShifts.get(direction + moveType);
    const edgeShift = this.positioningRules.edgeShifts.get(direction + moveType);
    if(!styleShifts || ! edgeShift) {
      return;
    }
    let tileDirection = this.getTileDirection(edgePosition.direction, moveType);
    this.placeTile(edgePosition, tilePosition, styleShifts, tileDirection);
    this.updateEdgePosition(edgePosition, edgeShift, tileDirection);
  }
  private getTileDirection(direction: Direction, moveType: MoveType): Direction {
    if(moveType === MoveType.TileInLine || moveType === MoveType.DoubleInLine) {
      return direction;
    } else {
      let newDirection = direction + 1;
      return newDirection <= 4 ? newDirection : 1;
    }
  }
  private isHorizontal(direction: Direction, tilePosition: DominoTilePosition) {
    if(tilePosition.tile.isDouble) {
      return direction === Direction.Top || direction === Direction.Down;
    } else {
      return direction === Direction.Left || direction === Direction.Right;
    }
  }
  rotateCorner(direction: Direction, edgePosition: EdgePosition, tileDisplay: TileDisplay) {
    let moveType: MoveType = this.isPreviousTileDouble(tileDisplay.tilePosition)
      ? MoveType.RotateCornerAfterDouble
      : MoveType.RotateCorner;
    let rotateShift = this.positioningRules.positionShifts.get(direction + moveType);
    let rotateEdgeShift = this.positioningRules.edgeShifts.get(direction + moveType);
    if(!rotateShift || !rotateEdgeShift) {
      return;
    }
    let tileDirection = this.getTileDirection(edgePosition.direction, moveType);
    this.rotateCornerTile(tileDisplay, rotateShift);
    this.updateEdgePosition(edgePosition, rotateEdgeShift, tileDirection);
  }
  private rotateCornerTile(tileDisplay: TileDisplay, tileShift: StylePropShifts) {
    tileDisplay.direction += 1;
    if(tileDisplay.direction > 4) {
      tileDisplay.direction = 1;
    }
    tileDisplay.isHorizontal = this.isHorizontal(tileDisplay.direction, tileDisplay.tilePosition);
    tileDisplay.styleProps.startRow += tileShift.rowShift ?? 0;
    tileDisplay.styleProps.startColumn += tileShift.columnShift ?? 0;
    tileDisplay.styleProps.rotate = false;
    if(this.needReverseTile(tileDisplay.direction, tileDisplay.tilePosition)) {
      tileDisplay.styleProps.rotate = true;
      tileDisplay.styleProps.startRow += tileShift.reverseRowShift ?? 0;
      tileDisplay.styleProps.startColumn += tileShift.reverseColumnShift ?? 0;
    }
  }
  
  private placeTile(edgePosition: EdgePosition, tilePosition: DominoTilePosition,
    stylePropShift: StylePropShifts, tileDirection: Direction) {
    let styleProp: StyleProp = {
      startRow: edgePosition.row + (stylePropShift.rowShift ?? 0),
      startColumn: edgePosition.column + (stylePropShift.columnShift ?? 0),
    };
    if(this.needReverseTile(tileDirection, tilePosition)) {
      styleProp.rotate = true;
      styleProp.startRow += (stylePropShift.reverseRowShift ?? 0);
      styleProp.startColumn += (stylePropShift.reverseColumnShift ?? 0);
    }
    let isHorizontal = this.isHorizontal(tileDirection, tilePosition);
    this.setTileDisplays(styleProp, isHorizontal, tilePosition, tileDirection);
  }
  private needReverseTile(direction: Direction, tilePosition: DominoTilePosition) {
    if(tilePosition.tile.isDouble) {
      return false;
    }
    let isContactedSideA: boolean = tilePosition.contactEdge === tilePosition.tile.a;
    if(isContactedSideA) {
      return direction === Direction.Left || direction === Direction.Top;
    } else {
      return direction === Direction.Right || direction === Direction.Down;
    }
  }
  private setTileDisplays(styleProps: StyleProp, isHorizontal: boolean,
    tilePosition: DominoTilePosition, tileDirection: Direction) {
    let tileDisplay: TileDisplay = {
      id: tilePosition.tile.tileId,
      styleProps: styleProps,
      isHorizontal: isHorizontal,
      tilePosition: tilePosition,
      direction: tileDirection
    };
    this.tileDispays.set(tilePosition.position, tileDisplay);
  }
  private getPreviousTile(tilePosition: DominoTilePosition): TileDisplay {
    let position = tilePosition.position > 0 ? tilePosition.position - 1 : tilePosition.position + 1;
    let tile = this.tileDispays.get(position);
    if(!tile) {
      console.error("Cannot get the tile on position " + position);
    }
    return tile!;
  }
  private isPreviousTileDouble(tilePosition: DominoTilePosition): boolean {
    return this.getPreviousTile(tilePosition)?.tilePosition.tile.isDouble ?? false;
  }
  private updateEdgePosition(edgePosition: EdgePosition, edgeShift: EdgeShift, direction: Direction) {
    edgePosition.direction = direction;
    edgePosition.row += edgeShift.rowShift ?? 0;
    edgePosition.column += edgeShift.columnShift ?? 0;
  }
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
  tilePosition: DominoTilePosition,
  direction: Direction
}
interface StyleProp {
  startRow: number,
  startColumn: number,
  rotate?: boolean
}
export interface StylePropShifts {
  rowShift?: number;
  columnShift?: number;
  reverseRowShift?: number;
  reverseColumnShift?: number;
}
export interface EdgeShift {
  rowShift?: number;
  columnShift?: number;
}
