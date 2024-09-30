import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { TileComponent } from "../tile/tile.component";
import { GameService } from './game.service';
import { GameState } from '../_models/gameState';
import { DominoTile } from '../_models/dominoTile';
import { PositioningRules } from './positioningRules';
import { TestGame } from './testGame';
import { MoveType } from './enums/moveType';
import { Direction } from './enums/direction';
import { PositionOnTable } from '../_models/positionOnTable';
import { TileDisplay } from '../_models/tileDisplay';
import { PositionShift } from '../_models/positionShift';

@Component({
  selector: 'Dom-game',
  standalone: true,
  imports: [
    TileComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  private columnsNumber: number = 0;
  private rowsNumber: number = 24;
  private leftEdgePosition: PositionOnTable = null!;
  private rightEdgePosition: PositionOnTable = null!;
  @ViewChild('GameTable') GameTable!: ElementRef<HTMLDivElement>;
  //game: GameState = null!;
  game: GameState = TestGame.getGame();
  tileDisplays: Map<number, TileDisplay> = new Map<number, TileDisplay>();

  constructor(private gameService: GameService) {
  }
  
  ngOnInit(): void {
    if(this.game === null) {
      this.start();
    }
    this.displayTiles();
  }
  start() {
    this.gameService.startGame()
      .subscribe(gs => this.game = gs);
  }
  buildStyle(styleProp: PositionOnTable): string {
    let style: string = "grid-row-start: " + styleProp.row + ";"
      + " grid-column-start: " + styleProp.column + ";";
    if(styleProp.rotateTile === true) {
      style += " transform: rotate(180deg)";
    }
    return style;
  }
  @HostListener('window:resize')
  onResize() {
    this.columnsNumber = this.calculateColumnsNumber();
    this.displayTiles();
  }
  private displayTiles(): void {
    this.columnsNumber = this.calculateColumnsNumber();
    this.populateTileDisplays();
  }
  
  private calculateColumnsNumber(): number {
    const pixelsInVh = window.innerHeight / 100;
    const columnWidth = 3 * pixelsInVh;
    const gameTableWidth = window.innerWidth * 10 / 12 - 20;
    return Math.floor(gameTableWidth / columnWidth);
  }
  private populateTileDisplays(): void {
    const sortedTilePositions = this.game.table.tilesOnTable.sort((a, b) => {
      return Math.abs(a.position) - Math.abs(b.position);
    });
    for(const tilePosition of sortedTilePositions) {
      this.calculateDisplayParameters(tilePosition);
    }
  }
  private calculateDisplayParameters(tilePosition: DominoTile): void {
    if(tilePosition.position === 0) {
      this.placeCenterTile(tilePosition);
    } else {
      let edgePosition = tilePosition.position < 0 ? this.leftEdgePosition : this.rightEdgePosition;
      let move = this.determineMoveType(edgePosition, tilePosition);
      console.log("tile: " + tilePosition.tileDetails.tileId + "\tdirection: " + edgePosition.currentDirection + "\tmove: " + move)
      this.placeTileOnTable(edgePosition.currentDirection!, move, edgePosition, tilePosition);
    }
  }
  private determineMoveType(edgePosition: PositionOnTable, tilePosition: DominoTile): MoveType {
    let moveType: MoveType = null!;
    if(this.canContinueLine(edgePosition.currentDirection!, edgePosition)) {
      moveType = tilePosition.tileDetails.isDouble ? MoveType.DoubleInLine : MoveType.TileInLine;
    } else if(this.canRotateInLine(edgePosition.currentDirection!, edgePosition)) {
      if(tilePosition.tileDetails.isDouble) {
        moveType = MoveType.DoubleInLine;
      } else {
        moveType = this.isPreviousTileDouble(tilePosition)
          ? MoveType.CornerOutDouble
          : MoveType.CornerInLine;
      }
    } else {
      if(tilePosition.tileDetails.isDouble) {
        let previousTileDisplay = this.getPreviousTile(tilePosition);
        moveType = this.isPreviousTileDouble(previousTileDisplay?.tile!)
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
  private canContinueLine(direction: Direction, edgePosition: PositionOnTable): boolean {
    return direction === Direction.Left && edgePosition.column > 5
      || direction === Direction.Top && edgePosition.row > 5
      || direction === Direction.Right && edgePosition.column < this.columnsNumber - 4
      || direction === Direction.Down && edgePosition.row < this.rowsNumber - 4;
  }
  private canRotateInLine(direction: Direction, edgePosition: PositionOnTable): boolean {
    return direction === Direction.Left && edgePosition.column > 3
      || direction === Direction.Top && edgePosition.row > 3
      || direction === Direction.Right && edgePosition.column < this.columnsNumber - 3
      || direction === Direction.Down && edgePosition.row < this.rowsNumber - 3;
  }
  
  private placeCenterTile(tilePosition: DominoTile): void {
    const elemStyle: PositionOnTable = {
      row: Math.floor(this.rowsNumber / 2),
      column: Math.floor(this.columnsNumber / 2),
    };
    this.leftEdgePosition = {
      row: elemStyle.row,
      column: elemStyle.column,
      currentDirection: Direction.Left
    };
    this.rightEdgePosition = {
      row: elemStyle.row,
      column: elemStyle.column,
      currentDirection: Direction.Right
    };
    
    if(tilePosition.tileDetails.isDouble) {
      elemStyle.row--;
      this.rightEdgePosition.column++;
    }
    else {
      elemStyle.column--;
      this.rightEdgePosition.column += 3;
    }
    this.setTileDisplays(elemStyle, !tilePosition.tileDetails.isDouble, tilePosition, Direction.Left);
  }
  private placeTileOnTable(direction: Direction, moveType: MoveType,
    edgePosition: PositionOnTable, tilePosition: DominoTile): void {
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
    const styleShifts = PositioningRules.positionShifts.get(direction + moveType);
    if(!styleShifts) {
      return;
    }
    let tileDirection = this.getTileDirection(edgePosition.currentDirection!, moveType);
    this.placeTile(edgePosition, tilePosition, styleShifts, tileDirection);
    this.updateEdgePosition(edgePosition, styleShifts, tileDirection);
  }
  private rotateCorner(direction: Direction, edgePosition: PositionOnTable, tileDisplay: TileDisplay) {
    let moveType: MoveType = this.isPreviousTileDouble(tileDisplay.tile)
      ? MoveType.RotateCornerAfterDouble
      : MoveType.RotateCorner;
    let rotateShift = PositioningRules.positionShifts.get(direction + moveType);
    if(!rotateShift) {
      console.error(`No positioning rules provided for direction ${direction} and movetype ${moveType}`);
      return;
    }
    let tileDirection = this.getTileDirection(edgePosition.currentDirection!, moveType);
    this.rotateCornerTile(tileDisplay, rotateShift);
    this.updateEdgePosition(edgePosition, rotateShift, tileDirection);
  }
  private rotateCornerTile(tileDisplay: TileDisplay, tileShift: PositionShift) {
    tileDisplay.direction += 1;
    if(tileDisplay.direction > 4) {
      tileDisplay.direction = 1;
    }
    tileDisplay.isHorizontal = this.isHorizontal(tileDisplay.direction, tileDisplay.tile);
    tileDisplay.positioning.row += tileShift.rowShift ?? 0;
    tileDisplay.positioning.column += tileShift.columnShift ?? 0;
    tileDisplay.positioning.rotateTile = false;
    if(this.needReverseTile(tileDisplay.direction, tileDisplay.tile)) {
      tileDisplay.positioning.rotateTile = true;
      tileDisplay.positioning.row += tileShift.reverseRowShift ?? 0;
      tileDisplay.positioning.column += tileShift.reverseColumnShift ?? 0;
    }
  }
  private updateEdgePosition(edgePosition: PositionOnTable, styleShift: PositionShift, direction: Direction) {
    edgePosition.currentDirection = direction;
    edgePosition.row += styleShift.edgeRowShift ?? 0;
    edgePosition.column += styleShift.edgeColumnShift ?? 0;
    return edgePosition;
  }
  private getTileDirection(direction: Direction, moveType: MoveType): Direction {
    if(moveType === MoveType.TileInLine || moveType === MoveType.DoubleInLine) {
      return direction;
    } else {
      let newDirection = direction + 1;
      return newDirection <= 4 ? newDirection : 1;
    }
  }
  private placeTile(edgePosition: PositionOnTable, tilePosition: DominoTile,
    stylePropShift: PositionShift, tileDirection: Direction) {
    let styleProp: PositionOnTable = {
      row: edgePosition.row + (stylePropShift.rowShift ?? 0),
      column: edgePosition.column + (stylePropShift.columnShift ?? 0),
    };
    if(this.needReverseTile(tileDirection, tilePosition)) {
      styleProp.rotateTile = true;
      styleProp.row += (stylePropShift.reverseRowShift ?? 0);
      styleProp.column += (stylePropShift.reverseColumnShift ?? 0);
    }
    let isHorizontal = this.isHorizontal(tileDirection, tilePosition);
    this.setTileDisplays(styleProp, isHorizontal, tilePosition, tileDirection);
  }
  private needReverseTile(direction: Direction, tilePosition: DominoTile) {
    if(tilePosition.tileDetails.isDouble) {
      return false;
    }
    let isContactedSideA: boolean = tilePosition.contactEdge === tilePosition.tileDetails.a;
    if(isContactedSideA) {
      return direction === Direction.Left || direction === Direction.Top;
    } else {
      return direction === Direction.Right || direction === Direction.Down;
    }
  }
  private isHorizontal(direction: Direction, tilePosition: DominoTile) {
    if(tilePosition.tileDetails.isDouble) {
      return direction === Direction.Top || direction === Direction.Down;
    } else {
      return direction === Direction.Left || direction === Direction.Right;
    }
  }
  private setTileDisplays(styleProps: PositionOnTable, isHorizontal: boolean,
    tilePosition: DominoTile, tileDirection: Direction) {
    let tileDisplay: TileDisplay = {
      id: tilePosition.tileDetails.tileId,
      positioning: styleProps,
      isHorizontal: isHorizontal,
      tile: tilePosition,
      direction: tileDirection
    };
    this.tileDisplays.set(tilePosition.position, tileDisplay);
  }
  private getPreviousTile(tilePosition: DominoTile): TileDisplay {
    let position = tilePosition.position > 0 ? tilePosition.position - 1 : tilePosition.position + 1;
    let tile = this.tileDisplays.get(position);
    if(!tile) {
      console.error("Cannot get the tile on position " + position);
    }
    return tile!;
  }
  private isPreviousTileDouble(tilePosition: DominoTile): boolean {
    return this.getPreviousTile(tilePosition)?.tile.tileDetails.isDouble ?? false;
  }
}
