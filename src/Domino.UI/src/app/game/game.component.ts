import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TileComponent } from "../tile/tile.component";
import { GameService } from './game.service';
import { GameState } from '../_models/gameState';
import { JsonPipe } from '@angular/common';
import { DominoTile } from '../_models/dominoTile';
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
  getGridPosition(tilePosition: DominoTilePosition) {
    let tile = tilePosition.tile;
    let row: number = 0;
    let column: number = 0;
    let transform: [x: number, y: number] = [1, 1];
    if(tilePosition.position === 0) {
      row = Math.floor(this.rowsNumber / 2);
      if(tile.isDouble) {
        row--;
      }
      column = Math.floor(this.columnsNumber / 2);
      if(!tile.isDouble) {
        column--;
      }
      if(tile.isDouble) {
        this.leftEdgePosition = [row + 1, column, direction.left];
        this.rightEdgePosition = [row + 1, column + 1, direction.right];
      }
      else {
        this.leftEdgePosition = [row, column, direction.left];
        this.rightEdgePosition = [row, column + 3, direction.right];
      }
      return "grid-row-start: " + row + ";"
        + " grid-column-start: " + column + ";";
    }
    else {
      if(tilePosition.position < 0) {
        switch(this.leftEdgePosition[2]) {
          case direction.left:
            if(this.leftEdgePosition[1] > 4)
            {
              row = tile.isDouble ? this.leftEdgePosition[0] - 1 : this.leftEdgePosition[0];
              column = tile.isDouble ? this.leftEdgePosition[1] - 2 : this.leftEdgePosition[1] - 4;
              this.leftEdgePosition[0] = row;
              this.leftEdgePosition[1] = column;
              if(tilePosition.contactEdge !== tile.b) {
                transform = [-1, 1];
                column += 3;
              }
            }
            else if(this.leftEdgePosition[1] > 2 && tile.isDouble)
            {
              row = this.leftEdgePosition[0] - 1;
              column = this.leftEdgePosition[1] - 2;
            }
            else
            {
              this.leftEdgePosition[2] = direction.top;
              row = this.leftEdgePosition[0] - 4;
              column = this.leftEdgePosition[1];
              this.orientation.push([tilePosition.position, 1]);
            }
            break;
          case direction.top:
            if(this.leftEdgePosition[0] > 4) 
            {
              row = tile.isDouble ? this.leftEdgePosition[0] - 6 : this.leftEdgePosition[0] - 4;
              column = tile.isDouble ? this.leftEdgePosition[1] - 1 : this.leftEdgePosition[1];
              
              if(tilePosition.contactEdge !== tile.b) {
                transform = [1, -1];
                row += 3;
              }
              this.leftEdgePosition[0] = row;
              this.leftEdgePosition[1] = column;
              if(tile.isDouble) {
                this.leftEdgePosition[1]++;
              }
              this.orientation.push([tilePosition.position, 1]);
            }
            else if(this.leftEdgePosition[0] > 2 && tile.isDouble)
            {
              row = this.leftEdgePosition[1] - 1;
              column = this.leftEdgePosition[0] - 2;
            }
            else
            {
              this.leftEdgePosition[2] = direction.right;
              row = this.leftEdgePosition[0];
              column = this.leftEdgePosition[1] + 1;
              this.orientation.push([tilePosition.position, 1]);
            }
            break;
          case direction.right:
            if(this.leftEdgePosition[1] < this.columnsNumber - 4)
              {
                row = tile.isDouble ? this.leftEdgePosition[0] - 1 : this.leftEdgePosition[0];
                column = tile.isDouble ? this.leftEdgePosition[1] + 1 : this.leftEdgePosition[1] + 1;
                this.leftEdgePosition[0] = row;
                this.leftEdgePosition[1] = column + 3;
                if(tilePosition.contactEdge !== tile.a) {
                  transform = [-1, 1];
                  column += 3;
                }
              }
              else if(this.leftEdgePosition[1] > 2 && tile.isDouble)
              {
                row = this.leftEdgePosition[0] - 1;
                column = this.leftEdgePosition[1] + 1;
                this.leftEdgePosition[0] = row + 3;
                this.leftEdgePosition[1] = column - 1;
              }
              else
              {
                this.leftEdgePosition[2] = direction.down;
                row = this.leftEdgePosition[0] + 1;
                column = this.leftEdgePosition[1] + 1;
                this.orientation.push([tilePosition.position, 1]);
                if(tilePosition.contactEdge !== tile.a) {
                  transform = [1, -1];
                  row += 3;
                }
              }
            break;
          case direction.down:

            break;
        }
      }
      else { // tile position > 0
        switch(this.rightEdgePosition[2]) {
          case direction.left:
            if(this.rightEdgePosition[1] > 4)
            {
              row = tile.isDouble ? this.rightEdgePosition[0] - 1 : this.rightEdgePosition[0];
              column = tile.isDouble ? this.rightEdgePosition[1] - 2 : this.rightEdgePosition[1] - 4;
              this.rightEdgePosition[0] = row;
              this.rightEdgePosition[1] = column;
              if(tilePosition.contactEdge !== tile.b) {
                transform = [-1, 1];
                column += 3;
              }
            }
            else if(this.rightEdgePosition[1] > 2 && tile.isDouble)
            {
              row = this.rightEdgePosition[0] - 1;
              column = this.rightEdgePosition[1] - 2;
            }
            else
            {
              this.rightEdgePosition[2] = direction.top;
              row = this.rightEdgePosition[0] - 4;
              column = this.rightEdgePosition[1];
              this.orientation.push([tilePosition.position, 1]);
            }
            break;
          case direction.top:
            if(this.rightEdgePosition[0] > 4) 
            {
              row = tile.isDouble ? this.rightEdgePosition[0] - 6 : this.rightEdgePosition[0] - 4;
              column = tile.isDouble ? this.rightEdgePosition[1] - 1 : this.rightEdgePosition[1];
              
              if(tilePosition.contactEdge !== tile.b) {
                transform = [1, -1];
                row += 3;
              }
              this.rightEdgePosition[0] = row;
              this.rightEdgePosition[1] = column;
              if(tile.isDouble) {
                this.rightEdgePosition[1]++;
              }
              this.orientation.push([tilePosition.position, 1]);
            }
            else if(this.rightEdgePosition[0] > 2 && tile.isDouble)
            {
              row = this.rightEdgePosition[1] - 1;
              column = this.rightEdgePosition[0] - 2;
            }
            else
            {
              this.rightEdgePosition[2] = direction.right;
              row = this.rightEdgePosition[0];
              column = this.rightEdgePosition[1] + 1;
              this.orientation.push([tilePosition.position, 1]);
            }
            break;
          case direction.right:
            if(this.rightEdgePosition[1] < this.columnsNumber - 4)
              {
                row = tile.isDouble ? this.rightEdgePosition[0] - 1 : this.rightEdgePosition[0];
                column = tile.isDouble ? this.rightEdgePosition[1] - 1 : this.rightEdgePosition[1] + 1;
                this.rightEdgePosition[0] = row;
                this.rightEdgePosition[1] = column + 3;
                if(tilePosition.contactEdge !== tile.a) {
                  transform = [-1, 1];
                  column += 3;
                }
              }
              else if(this.rightEdgePosition[1] < this.columnsNumber - 2 && tile.isDouble)
              {
                row = this.rightEdgePosition[0] - 1;
                column = this.rightEdgePosition[1] + 1;
                this.rightEdgePosition[0] = row + 3;
                this.rightEdgePosition[1] = column - 1;
              }
              else
              {
                this.rightEdgePosition[2] = direction.down;
                row = this.rightEdgePosition[0];
                column = this.rightEdgePosition[1] + 1;
                this.orientation.push([tilePosition.position, 1]);
                if(tilePosition.contactEdge !== tile.a) {
                  transform = [1, -1];
                  row += 3;
                }
              }
            break;
          case direction.down:
            if(this.rightEdgePosition[0] < this.rowsNumber - 4)
              {
                row = tile.isDouble ? this.rightEdgePosition[0] + 4 : this.rightEdgePosition[0] - 1;
                column = tile.isDouble ? this.rightEdgePosition[1] : this.rightEdgePosition[1] + 2;
                this.rightEdgePosition[0] = row + 3;
                this.rightEdgePosition[1] = column - 1;
                if(tilePosition.contactEdge !== tile.a) {
                  transform = [1, -1];
                  row += 3;
                }
                this.orientation.push([tilePosition.position, 1]);
              }
              else if(this.rightEdgePosition[1] < this.rowsNumber - 2 && tile.isDouble)
              {
                row = this.rightEdgePosition[0] - 1;
                column = this.rightEdgePosition[1] + 1;
                this.rightEdgePosition[0] = row + 3;
                this.rightEdgePosition[1] = column - 1;
              }
              else
              {
                this.rightEdgePosition[2] = direction.down;
                row = this.rightEdgePosition[0] + 1;
                column = this.rightEdgePosition[1] + 1;
                this.orientation.push([tilePosition.position, 1]);
                if(tilePosition.contactEdge !== tile.a) {
                  transform = [1, -1];
                  row += 3;
                }
              }
            break;
        }
      }
      let style: string = "grid-row-start: " + row + ";"
        + " grid-column-start: " + column + ";";
      if(transform[0] !== 1 || transform[1] !== 1) {
        style += " transform: scaleX(" + transform[0] + ") scaleY(" + transform[1] + ");";
      }
      return style;
    }
  }
  private leftEdgePosition: [row: number, column: number, dir: direction] = [0, 0, direction.left];
  private rightEdgePosition: [row: number, column: number, dir: direction] = [0, 0, direction.right];

  private orientation: [position: number, orientation: number][] = [];

  private reorderTilesOnTable() {
    this.game.table.tilesOnTable = 
      this.game.table.tilesOnTable.sort((a, b) => {
        return Math.abs(a.position) - Math.abs(b.position);
      });
  }
  isHorizontal(tilePosition: DominoTilePosition): boolean {
    let or = this.orientation.find(p => p[0] === tilePosition.position);
    if (or && or[1] !== 0) {
      return tilePosition.tile.isDouble;
    }
    else {
      return !tilePosition.tile.isDouble;
    }
  }
}
enum direction {
  top,
  down,
  left,
  right
}
