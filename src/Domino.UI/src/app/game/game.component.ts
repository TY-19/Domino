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
  tileDispays: Map<string, TileDisplay> = new Map<string, TileDisplay>();
  constructor(private gameService: GameService) {
    
  }
  private columnsNumber: number = 0;
  private rowsNumber: number = 24;
  ngOnInit() {
    if(this.game === null) {
      this.start();
    }
    this.reorderTilesOnTable();
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
    for(let tilePosition of this.game.table.tilesOnTable) {
      this.setGridPosition(tilePosition);
    }
  }
  private buildStyle(styleProp: StyleProp): string {
    let style: string = "grid-row-start: " + styleProp.startRow + ";"
      + " grid-column-start: " + styleProp.startColumn + ";";
    if(styleProp.transformX !== 1 || styleProp.transformY !== 1) {
      style += " transform: scaleX(" + styleProp.transformX + ") scaleY(" + styleProp.transformY + ");";
    }
    return style;
  }
  getGridPosition(tilePosition: DominoTilePosition): string {
    let tileDisplay = this.tileDispays.get(tilePosition.tile.tileId);
    if(tileDisplay) {
      return this.buildStyle(tileDisplay.styles);
    } else {
      this.setGridPosition(tilePosition);
      tileDisplay = this.tileDispays.get(tilePosition.tile.tileId);
      return tileDisplay ? this.buildStyle(tileDisplay.styles) : "";
    }
  }
  setGridPosition(tilePosition: DominoTilePosition): void {
    let elPosStyle: ElementPositionStyle = {
      row: 0,
      column: 0,
      transform: [1, 1]
    };
    if(tilePosition.position === 0) {
      elPosStyle = this.getStartTilePosition(tilePosition);
    } else {
      let edgeType: EdgeType = tilePosition.position < 0 ? EdgeType.Left : EdgeType.Right;
      let edgePosition = this.getEdgePosition(edgeType);
      switch(edgePosition[2]) {
        case Direction.Left:
          elPosStyle = this.getToLeftTilePosition(edgeType, tilePosition);
          break;
        case Direction.Top:
          elPosStyle = this.getToTopTilePosition(edgeType, tilePosition);
          break;
        case Direction.Right:
          elPosStyle = this.getToRightTilePosition(edgeType, tilePosition);
          break;
        case Direction.Down:
          elPosStyle = this.getToDownTilePosition(edgeType, tilePosition);
          break;
      }
    }
    let style: string = "grid-row-start: " + elPosStyle.row + ";"
      + " grid-column-start: " + elPosStyle.column + ";";
    if(elPosStyle.transform[0] !== 1 || elPosStyle.transform[1] !== 1) {
      style += " transform: scaleX(" + elPosStyle.transform[0] + ") scaleY(" + elPosStyle.transform[1] + ");";
    }
    let tileDisplay: TileDisplay = {
      id: tilePosition.tile.tileId,
      styles: {
        startRow: elPosStyle.row,
        startColumn: elPosStyle.column,
        transformX: elPosStyle.transform[0],
        transformY: elPosStyle.transform[1]
      },
      isHorizontal: this.isHorizontal(tilePosition),
      tilePosition: tilePosition
    };
    this.tileDispays.set(tilePosition.tile.tileId, tileDisplay);  
  }
  getStartTilePosition(tilePosition: DominoTilePosition): ElementPositionStyle {
    let elPosStyle: ElementPositionStyle = {
      row: Math.floor(this.rowsNumber / 2),
      column: Math.floor(this.columnsNumber / 2),
      transform: [1, 1]
    };
    if(tilePosition.tile.isDouble) {
      elPosStyle.row--;
      this.setEdgePosition(EdgeType.Left, [elPosStyle.row + 1, elPosStyle.column, Direction.Left]);
      this.setEdgePosition(EdgeType.Right, [elPosStyle.row + 1, elPosStyle.column + 1, Direction.Right]);
    }
    else {
      elPosStyle.column--;
      this.setEdgePosition(EdgeType.Left, [elPosStyle.row, elPosStyle.column, Direction.Left]);
      this.setEdgePosition(EdgeType.Right, [elPosStyle.row, elPosStyle.column + 3, Direction.Right]);
    }
    return elPosStyle;
  }
  private setEdgePosition(edgeType: EdgeType, position: [row: number, column: number, direction: Direction]) {
    if(edgeType === EdgeType.Left) {
      this.leftEdgePosition = position;
    }
    else if (edgeType === EdgeType.Right) {
      this.rightEdgePosition = position;
    }
  }
  private getEdgePosition(edgeType: EdgeType) {
    return edgeType === EdgeType.Left ? this.leftEdgePosition : this.rightEdgePosition;
  }
  getToLeftTilePosition(edgeType: EdgeType, tilePosition: DominoTilePosition): ElementPositionStyle {
    let elPosStyle: ElementPositionStyle = {
      row: 0,
      column: 0,
      transform: [1, 1]
    };
    let edgePosition = this.getEdgePosition(edgeType);
    if(edgePosition[1] > 4)
    {
      elPosStyle.row = tilePosition.tile.isDouble ? edgePosition[0] - 1 : edgePosition[0];
      elPosStyle.column = tilePosition.tile.isDouble ? edgePosition[1] - 2 : edgePosition[1] - 4;
      let rowEdge = tilePosition.tile.isDouble ? elPosStyle.row + 1 : elPosStyle.row;
      this.setEdgePosition(edgeType, [rowEdge, elPosStyle.column, Direction.Left]);
      if(tilePosition.contactEdge !== tilePosition.tile.b) {
        elPosStyle.transform = [-1, 1];
        elPosStyle.column += 3;
      }
    }
    else if(edgePosition[1] > 3) {
      elPosStyle.row = edgePosition[0] - 2;
      elPosStyle.column = edgePosition[1] - 2;
      this.orientation.push([tilePosition.position, 1]);
      this.setEdgePosition(edgeType, [elPosStyle.row, elPosStyle.column, Direction.Top]);
    }
    else if(edgePosition[1] > 2 && tilePosition.tile.isDouble)
    {
      elPosStyle.row = edgePosition[0] - 1;
      elPosStyle.column = edgePosition[1] - 2;
      this.setEdgePosition(edgeType, [elPosStyle.row, elPosStyle.column, Direction.Top]);
    }
    else
    {
      if(tilePosition.tile.isDouble) {
        elPosStyle.row = edgePosition[0] - 4;
        elPosStyle.column = edgePosition[1] + 1;
        this.setEdgePosition(edgeType, [elPosStyle.row, elPosStyle.column + 1, Direction.Top]);
        this.orientation.push([tilePosition.position, 1]);
        let cornerPosition: number = tilePosition.position < 0
          ? tilePosition.position + 1 : tilePosition.position - 1;
        this.rotateCornerTile(cornerPosition, "left-up");
      } else {
        elPosStyle.row = edgePosition[0] - 4;
        elPosStyle.column = edgePosition[1];
        this.setEdgePosition(edgeType, [elPosStyle.row, elPosStyle.column, Direction.Top]);
        this.orientation.push([tilePosition.position, 1]);
        if(tilePosition.contactEdge !== tilePosition.tile.b) {
          elPosStyle.transform = [1, -1];
          elPosStyle.row += 3;
        }
      }
    }
    return elPosStyle;
  }
  getToTopTilePosition(edgeType: EdgeType, tilePosition: DominoTilePosition): ElementPositionStyle {
    let elPosStyle: ElementPositionStyle = {
      row: 0,
      column: 0,
      transform: [1, 1]
    };
    let edgePosition = this.getEdgePosition(edgeType);
    if(edgePosition[0] > 4)
    {
      elPosStyle.row = tilePosition.tile.isDouble ? edgePosition[0] - 2 : edgePosition[0] - 4;
      elPosStyle.column = tilePosition.tile.isDouble ? edgePosition[1] - 1 : edgePosition[1];
      let edgeColumn = tilePosition.tile.isDouble ? elPosStyle.column + 1 : elPosStyle.column;
      this.setEdgePosition(edgeType, [elPosStyle.row, edgeColumn, Direction.Top]);
      if(tilePosition.contactEdge !== tilePosition.tile.b) {
        elPosStyle.transform = [1, -1];
        elPosStyle.row += 3;
      }
      let tileDisplay: TileDisplay = {
        id: tilePosition.tile.tileId,
        styles: {
          startRow: elPosStyle.row,
          startColumn: elPosStyle.column,
          transformX: elPosStyle.transform[0],
          transformY: elPosStyle.transform[1]
        },
        isHorizontal: tilePosition.tile.isDouble,
        tilePosition: tilePosition
      };
      this.tileDispays.set(tilePosition.tile.tileId, tileDisplay);
    }
    else if(edgePosition[0] > 2 && tilePosition.tile.isDouble)
    {
      elPosStyle.row = edgePosition[0] - 2;
      elPosStyle.column = edgePosition[1] - 1;
      let tileDisplay: TileDisplay = {
        id: tilePosition.tile.tileId,
        styles: {
          startRow: elPosStyle.row,
          startColumn: elPosStyle.column,
          transformX: elPosStyle.transform[0],
          transformY: elPosStyle.transform[1]
        },
        isHorizontal: true,
        tilePosition: tilePosition
      };
      this.tileDispays.set(tilePosition.tile.tileId, tileDisplay);
      this.setEdgePosition(edgeType, [elPosStyle.row, elPosStyle.column + 3, Direction.Right]);
    }
    else
    {
      if(tilePosition.tile.isDouble) {
        elPosStyle.row = edgePosition[0] - 1;
        elPosStyle.column = edgePosition[1] + 2;
        this.setEdgePosition(edgeType, [elPosStyle.row + 1, elPosStyle.column + 1, Direction.Right]);
        this.orientation.push([tilePosition.position, 0]);
        // let cornerPosition: number = tilePosition.position < 0
        //   ? tilePosition.position + 1 : tilePosition.position - 1;
        // this.rotateCornerTile(cornerPosition, "left-up");
      } else {
        elPosStyle.row = edgePosition[0] - 2;
        elPosStyle.column = edgePosition[1] + 2;
        this.setEdgePosition(edgeType, [elPosStyle.row, elPosStyle.column, Direction.Right]);
        this.orientation.push([tilePosition.position, 0]);
        if(tilePosition.contactEdge !== tilePosition.tile.b) {
          elPosStyle.transform = [1, -1];
          elPosStyle.row += 3;
        }
      }
    }
    return elPosStyle;
  }
  getToRightTilePosition(edgeType: EdgeType, tilePosition: DominoTilePosition): ElementPositionStyle {
    let elPosStyle: ElementPositionStyle = {
      row: 0,
      column: 0,
      transform: [1, 1]
    };
    let edgePosition = this.getEdgePosition(edgeType);
    if(edgePosition[1] < this.columnsNumber - 4)
    {
      elPosStyle.row = tilePosition.tile.isDouble ? edgePosition[0] : edgePosition[0];
      elPosStyle.column = tilePosition.tile.isDouble ? edgePosition[1] + 1 : edgePosition[1] + 1;
      let edgeColumn = tilePosition.tile.isDouble ? elPosStyle.column + 3 : elPosStyle.column + 3;
      this.setEdgePosition(edgeType, [elPosStyle.row, edgeColumn, Direction.Right]);
      if(tilePosition.contactEdge !== tilePosition.tile.a) {
        elPosStyle.transform = [-1, 1];
        elPosStyle.column += 3;
      }
      let tileDisplay: TileDisplay = {
        id: tilePosition.tile.tileId,
        styles: {
          startRow: elPosStyle.row,
          startColumn: elPosStyle.column,
          transformX: elPosStyle.transform[0],
          transformY: elPosStyle.transform[1]
        },
        isHorizontal: !tilePosition.tile.isDouble,
        tilePosition: tilePosition
      };
      this.tileDispays.set(tilePosition.tile.tileId, tileDisplay);
    }
    else if(edgePosition[1] < this.columnsNumber - 2 && tilePosition.tile.isDouble)
    {
      elPosStyle.row = edgePosition[0] - 1;
      elPosStyle.column = edgePosition[1] + 1;
      let tileDisplay: TileDisplay = {
        id: tilePosition.tile.tileId,
        styles: {
          startRow: elPosStyle.row,
          startColumn: elPosStyle.column,
          transformX: elPosStyle.transform[0],
          transformY: elPosStyle.transform[1]
        },
        isHorizontal: false,
        tilePosition: tilePosition
      };
      this.tileDispays.set(tilePosition.tile.tileId, tileDisplay);
      this.setEdgePosition(edgeType, [elPosStyle.row + 3, elPosStyle.column, Direction.Down]);
    } else {
      console.log("Not implemented getToRightTilePosition else");
    }
    return elPosStyle;
  }
  getToDownTilePosition(edgeType: EdgeType, tilePosition: DominoTilePosition): ElementPositionStyle {
    let elPosStyle: ElementPositionStyle = {
      row: 0,
      column: 0,
      transform: [1, 1]
    };
    let edgePosition = this.getEdgePosition(edgeType);
    if(edgePosition[0] < this.rowsNumber - 4)
    {
      elPosStyle.row = tilePosition.tile.isDouble ? edgePosition[0] + 1 : edgePosition[0] + 1;
      elPosStyle.column = tilePosition.tile.isDouble ? edgePosition[1] - 1 : edgePosition[1];
      let edgeColumn = tilePosition.tile.isDouble ? elPosStyle.column + 1 : elPosStyle.column;
      let edgeRow = tilePosition.tile.isDouble ? elPosStyle.row + 1 : elPosStyle.row + 3;
      this.setEdgePosition(edgeType, [edgeRow, edgeColumn, Direction.Down]);
      if(tilePosition.contactEdge !== tilePosition.tile.a) {
        elPosStyle.transform = [1, -1];
        elPosStyle.row += 3;
      }
      let tileDisplay: TileDisplay = {
        id: tilePosition.tile.tileId,
        styles: {
          startRow: elPosStyle.row,
          startColumn: elPosStyle.column,
          transformX: elPosStyle.transform[0],
          transformY: elPosStyle.transform[1]
        },
        isHorizontal: tilePosition.tile.isDouble,
        tilePosition: tilePosition
      };
      this.tileDispays.set(tilePosition.tile.tileId, tileDisplay);
    }
    else if(edgePosition[0] <= this.rowsNumber - 2 && tilePosition.tile.isDouble)
    {
      elPosStyle.row = edgePosition[0] + 1;
      elPosStyle.column = edgePosition[1] - 1;
      let tileDisplay: TileDisplay = {
        id: tilePosition.tile.tileId,
        styles: {
          startRow: elPosStyle.row,
          startColumn: elPosStyle.column,
          transformX: elPosStyle.transform[0],
          transformY: elPosStyle.transform[1]
        },
        isHorizontal: true,
        tilePosition: tilePosition
      };
      this.tileDispays.set(tilePosition.tile.tileId, tileDisplay);
      this.setEdgePosition(edgeType, [elPosStyle.row, elPosStyle.column, Direction.Left]);
    }
    else
    {
      console.log(tilePosition.tile);
      console.log(edgePosition);
      if(tilePosition.tile.isDouble) {
        elPosStyle.row = edgePosition[0] - 2;
        elPosStyle.column = edgePosition[1] - 2;
        this.setEdgePosition(edgeType, [elPosStyle.row + 1, elPosStyle.column, Direction.Left]);
        this.orientation.push([tilePosition.position, 0]);
        // let cornerPosition: number = tilePosition.position < 0
        //   ? tilePosition.position + 1 : tilePosition.position - 1;
        // this.rotateCornerTile(cornerPosition, "left-up");
      } else {
        elPosStyle.row = edgePosition[0] - 1;
        elPosStyle.column = edgePosition[1] - 4;
        this.setEdgePosition(edgeType, [elPosStyle.row, elPosStyle.column, Direction.Left]);
        this.orientation.push([tilePosition.position, 0]);
        if(tilePosition.contactEdge !== tilePosition.tile.b) {
          elPosStyle.transform = [1, -1];
          elPosStyle.row += 3;
        }
      }
    }
    return elPosStyle;
  }

  private rotateCornerTile(position: number, type: string) {
    switch(type) {
      case "left-up":
        let tilePosition = this.game.table.tilesOnTable.find(t => t.position === position);
        if(tilePosition) {
          let tileId = tilePosition?.tile.tileId;
          let tileDisplay = this.tileDispays.get(tileId);
          if(tileDisplay) {
            if(tilePosition.contactEdge === tilePosition.tile.a) {
              tileDisplay.isHorizontal = false;
              tileDisplay.styles.transformY *= -1;
              tileDisplay.styles.startRow += 1;
            } else {
              tileDisplay.isHorizontal = false;
              tileDisplay.styles.startRow -= 2;
              tileDisplay.styles.startColumn += 2;
            }
          }
        }
        break;
      default:
        break;
    }
  }

  private leftEdgePosition: [row: number, column: number, dir: Direction] = [0, 0, Direction.Left];
  private rightEdgePosition: [row: number, column: number, dir: Direction] = [0, 0, Direction.Right];

  private orientation: [position: number, orientation: number][] = [];

  private reorderTilesOnTable() {
    this.game.table.tilesOnTable = 
      this.game.table.tilesOnTable.sort((a, b) => {
        return Math.abs(a.position) - Math.abs(b.position);
      });
  }
  isHorizontal(tilePosition: DominoTilePosition): boolean {
    let tileDisplay = this.tileDispays.get(tilePosition.tile.tileId);
    if(tileDisplay) {
      return tileDisplay.isHorizontal;
    }
    let or = this.orientation.find(p => p[0] === tilePosition.position);
    if (or && or[1] !== 0) {
      return tilePosition.tile.isDouble;
    }
    else {
      return !tilePosition.tile.isDouble;
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

interface ElementPositionStyle {
  row: number;
  column: number;
  transform: [x: number, y: number];
}

interface TileDisplay {
  id: string,
  styles: StyleProp,
  isHorizontal: boolean,
  tilePosition: DominoTilePosition
}
interface StyleProp {
  startRow: number,
  startColumn: number,
  transformX: number,
  transformY: number
}
