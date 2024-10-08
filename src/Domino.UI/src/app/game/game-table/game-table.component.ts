import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PositionOnTable } from '../../_models/positionOnTable';
import { TileDisplay } from '../../_models/tileDisplay';
import { DominoTile } from '../../_models/dominoTile';
import { Direction } from '../enums/direction';
import { MoveType } from '../enums/moveType';
import { PositionShift } from '../../_models/positionShift';
import { PositioningRules } from './positioningRules';
import { TileComponent } from '../../tile/tile.component';

@Component({
  selector: 'Dom-game-table',
  standalone: true,
  imports: [
    TileComponent
  ],
  templateUrl: './game-table.component.html',
  styleUrl: './game-table.component.scss'
})
export class GameTableComponent {
  private columnsNumber: number = 0;
  private rowsNumber: number = 24;
  leftEdgePosition: PositionOnTable = null!;
  rightEdgePosition: PositionOnTable = null!;
  @Input() tiles: DominoTile[] = [];
  tileDisplays: Map<number, TileDisplay> = new Map<number, TileDisplay>();
  showPlaces: boolean = false;
  @Output() playToSide: EventEmitter<boolean> = new EventEmitter<boolean>();
  playTile(isLeft: boolean) {
    this.playToSide.emit(isLeft);
  }
  constructor() {

  }
  ngOnInit(): void {
    this.displayTiles();
  }
  buildStyle(position: PositionOnTable): string {
    let style: string = "grid-row-start: " + position.row + ";"
      + " grid-column-start: " + position.column + ";";
    if(position.rotateTile === true) {
      style += " transform: rotate(180deg)";
    }
    return style;
  }
  displayTiles(): void {
    this.columnsNumber = this.calculateColumnsNumber();
    this.populateTileDisplays();

    this.def = {
      row: Math.floor(this.rowsNumber / 2),
      column: Math.floor(this.columnsNumber / 2),
    };
    this.leftActive = this.leftEdgePosition ?? this.def;
    this.rightActive = this.rightEdgePosition ?? this.def;
    if(this.leftEdgePosition && this.leftEdgePosition.currentDirection === Direction.Right) {
      this.leftActive.column--;
    }
    if(this.rightEdgePosition && this.rightEdgePosition.currentDirection === Direction.Right) {
      this.rightActive.column--;
    }
  }
  updateDisplayingTiles(tiles: DominoTile[]): void {
    this.tiles = tiles;
    if(tiles.length > 0) {
      this.displayTiles();
    }
  }
  def: PositionOnTable = {
    row: Math.floor(this.rowsNumber / 2),
    column: Math.floor(this.columnsNumber / 2),
  };
  leftActive: PositionOnTable = this.leftEdgePosition ?? this.def;
  rightActive: PositionOnTable = this.rightEdgePosition ?? this.def;
  
  private calculateColumnsNumber(): number {
    const columnWidth: number = 3 * window.innerHeight / 100;
    const gameTableWidth: number = window.innerWidth * 10 / 12 - 20;
    return Math.floor(gameTableWidth / columnWidth);
  }
  private populateTileDisplays(): void {
    const sortedTilePositions: DominoTile[] = this.tiles
      .sort((a, b) => Math.abs(a.position) - Math.abs(b.position));
    for(const tilePosition of sortedTilePositions) {
      this.calculateDisplayParameters(tilePosition);
    }
  }
  private calculateDisplayParameters(tile: DominoTile): void {
    if(tile.position === 0) {
      this.placeCenterTile(tile);
    } else {
      const edgePosition: PositionOnTable = tile.position < 0
        ? this.leftEdgePosition
        : this.rightEdgePosition;
      const move: MoveType = this.determineMoveType(edgePosition, tile);
      // console.log("tile: " + tile.tileDetails.tileId + "\tdirection: " + edgePosition.currentDirection + "\tmove: " + move);
      this.placeTileOnTable(move, edgePosition, tile);
    }
  }
  private placeCenterTile(tile: DominoTile): void {
    const position: PositionOnTable = {
      row: Math.floor(this.rowsNumber / 2),
      column: Math.floor(this.columnsNumber / 2),
    };
    this.leftEdgePosition = {
      row: position.row,
      column: position.column,
      currentDirection: Direction.Left
    };
    this.rightEdgePosition = {
      row: position.row,
      column: position.column,
      currentDirection: Direction.Right
    };
    if(tile.tileDetails.isDouble) {
      position.row--;
      this.rightEdgePosition.column++;
    }
    else {
      this.rightEdgePosition.column += 3;
    }
    this.setTileDisplays(position, tile, Direction.Left);
  }
  private determineMoveType(edgePosition: PositionOnTable, tile: DominoTile): MoveType {
    let moveType: MoveType = null!;
    if(this.canContinueLine(edgePosition)) {
      moveType = tile.tileDetails.isDouble
        ? MoveType.DoubleInLine
        : MoveType.TileInLine;
    } else if(this.canRotateInLine(edgePosition)) {
      if(tile.tileDetails.isDouble) {
        moveType = MoveType.DoubleInLine;
      } else {
        moveType = this.isPreviousTileDouble(tile)
          ? MoveType.CornerOutDouble
          : MoveType.CornerInLine;
      }
    } else {
      if(tile.tileDetails.isDouble) {
        const previousTileDisplay: TileDisplay = this.getPreviousTile(tile);
        moveType = this.isPreviousTileDouble(previousTileDisplay.tile)
          ? MoveType.RotateCornerAfterDouble
          : MoveType.RotateCorner;
        moveType += MoveType.DoubleInLine;
      } else {
        moveType = this.isPreviousTileDouble(tile)
          ? MoveType.CornerOutDouble
          : MoveType.CornerOut;
      }
    }
    return moveType;
  }
  private canContinueLine(edgePosition: PositionOnTable): boolean {
    return edgePosition.currentDirection === Direction.Left && edgePosition.column > 5
      || edgePosition.currentDirection === Direction.Top && edgePosition.row > 5
      || edgePosition.currentDirection === Direction.Right && edgePosition.column < this.columnsNumber - 4
      || edgePosition.currentDirection === Direction.Down && edgePosition.row < this.rowsNumber - 4;
  }
  private canRotateInLine(edgePosition: PositionOnTable): boolean {
    return edgePosition.currentDirection === Direction.Left && edgePosition.column > 3
      || edgePosition.currentDirection === Direction.Top && edgePosition.row > 3
      || edgePosition.currentDirection === Direction.Right && edgePosition.column < this.columnsNumber - 3
      || edgePosition.currentDirection === Direction.Down && edgePosition.row < this.rowsNumber - 3;
  }
  
  private placeTileOnTable(moveType: MoveType, edgePosition: PositionOnTable, tile: DominoTile): void {
    if(this.needRotatePreviousTile(moveType)) {
      this.rotatePreviousTile(moveType, edgePosition, tile);
      moveType = moveType % 100;
    }
    const positionShift = PositioningRules.positionShifts.get(edgePosition.currentDirection! + moveType);
    edgePosition.currentDirection = this.getNewDirection(moveType, edgePosition.currentDirection);
    this.placeTile(edgePosition, tile, positionShift);
    this.updateEdgePosition(edgePosition, positionShift);
  }
  private needRotatePreviousTile(moveType: MoveType) {
    return moveType >= 100;
  }
  private rotatePreviousTile(moveType: MoveType, edgePosition: PositionOnTable, tile: DominoTile) {
    const tileDisplay = this.getPreviousTile(tile);
    const rotationMove = moveType - moveType % 100;
    const rotateShift = PositioningRules.positionShifts.get(tileDisplay.direction + rotationMove);
    tileDisplay.direction = this.getNewDirection(rotationMove, tileDisplay.direction);
    tileDisplay.isHorizontal = this.isHorizontal(tileDisplay.direction, tileDisplay.tile);
    tileDisplay.positioning.rotateTile = false;
    edgePosition.currentDirection = tileDisplay.direction;
    this.placeTile(edgePosition, tileDisplay.tile, rotateShift);
    this.updateEdgePosition(edgePosition, rotateShift);
  }
  private updateEdgePosition(edgePosition: PositionOnTable, positionShift?: PositionShift) {
    edgePosition.row += positionShift?.edgeRowShift ?? 0;
    edgePosition.column += positionShift?.edgeColumnShift ?? 0;
    return edgePosition;
  }
  private getNewDirection(moveType: MoveType, direction?: Direction): Direction {
    if(!direction) {
      return Direction.Left;
    }
    if(moveType === MoveType.TileInLine || moveType === MoveType.DoubleInLine) {
      return direction;
    } else {
      let newDirection = direction + 1;
      return newDirection <= 4 ? newDirection : 1;
    }
  }
  private placeTile(edgePosition: PositionOnTable, tile: DominoTile, positionShift?: PositionShift) {
    const position: PositionOnTable = {
      row: edgePosition.row + (positionShift?.rowShift ?? 0),
      column: edgePosition.column + (positionShift?.columnShift ?? 0),
    };
    if(this.needReverseTile(edgePosition.currentDirection!, tile)) {
      position.rotateTile = true;
      position.row += (positionShift?.reverseRowShift ?? 0);
      position.column += (positionShift?.reverseColumnShift ?? 0);
    }
    this.setTileDisplays(position, tile, edgePosition.currentDirection!);
  }
  private needReverseTile(direction: Direction, tile: DominoTile) {
    if(tile.tileDetails.isDouble) {
      return false;
    }
    const isContactedEdgeAtSideA: boolean = tile.contactEdge === tile.tileDetails.sideA;
    if(isContactedEdgeAtSideA) {
      return direction === Direction.Left || direction === Direction.Top;
    } else {
      return direction === Direction.Right || direction === Direction.Down;
    }
  }
  private isHorizontal(direction: Direction, tile: DominoTile) {
    if(tile.tileDetails.isDouble) {
      return direction === Direction.Top || direction === Direction.Down;
    } else {
      return direction === Direction.Left || direction === Direction.Right;
    }
  }
  private setTileDisplays(positioning: PositionOnTable, tile: DominoTile, direction: Direction) {
    const tileDisplay: TileDisplay = {
      positioning: positioning,
      isHorizontal: this.isHorizontal(direction, tile),
      tile: tile,
      direction: direction
    };
    this.tileDisplays.set(tile.position, tileDisplay);
  }
  private getPreviousTile(tile: DominoTile): TileDisplay {
    let position = tile.position > 0 ? tile.position - 1 : tile.position + 1;
    let tileDisplay = this.tileDisplays.get(position);
    if(!tileDisplay) {
      console.error("Cannot get the tile on position " + position);
    }
    return tileDisplay!;
  }
  private isPreviousTileDouble(tilePosition: DominoTile): boolean {
    return this.getPreviousTile(tilePosition)?.tile.tileDetails.isDouble ?? false;
  }
}
