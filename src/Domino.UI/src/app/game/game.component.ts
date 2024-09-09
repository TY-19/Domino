import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TileComponent } from "../tile/tile.component";
import { GameService } from './game.service';
import { GameState } from '../_models/gameState';
import { JsonPipe } from '@angular/common';
import { DominoTile } from '../_models/dominoTile';

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
          a: 0,
          b: 4,
          tileId: "04",
          isDouble: false
        },
        {
          a: 4,
          b: 4,
          tileId: "44",
          isDouble: true
        },
        {
          a: 4,
          b: 6,
          tileId: "46",
          isDouble: false
        },
        {
          a: 2,
          b: 6,
          tileId: "26",
          isDouble: false
        },
        {
          a: 1,
          b: 2,
          tileId: "12",
          isDouble: false
        },
        {
          a: 0,
          b: 1,
          tileId: "01",
          isDouble: false
        },
        {
          a: 0,
          b: 3,
          tileId: "03",
          isDouble: false
        },
        {
          a: 3,
          b: 3,
          tileId: "33",
          isDouble: true
        },
        {
          a: 1,
          b: 3,
          tileId: "13",
          isDouble: false
        },
        {
          a: 1,
          b: 6,
          tileId: "16",
          isDouble: false
        },
        {
          a: 0,
          b: 6,
          tileId: "06",
          isDouble: false
        }
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
  getGridPosition(tile: DominoTile) {
    if(this.leftEdgePosition[0] === 0) {
      let row = Math.floor(this.rowsNumber / 2);
      if(tile.isDouble) {
        row--;
      }
      let column = Math.floor(this.columnsNumber / 2);
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
      let startIndex = this.game.table.tilesOnTable.indexOf(this.game.log.events[0].tile);
      let currentIndex = this.game.table.tilesOnTable.indexOf(tile);
      let row: number = 0;
      let column: number = 0;
      if(currentIndex < startIndex) {
        switch(this.leftEdgePosition[2]) {
          case direction.left:
            if(this.leftEdgePosition[1] > 4)
            {
              row = tile.isDouble ? this.leftEdgePosition[0] - 1 : this.leftEdgePosition[0];
              column = tile.isDouble ? this.leftEdgePosition[1] - 2 : this.leftEdgePosition[1] - 4;
              this.leftEdgePosition[0] = row;
              this.leftEdgePosition[1] = column;
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
            }
            break;
        }
      }
      return "grid-row-start: " + row + ";"
        + " grid-column-start: " + column + ";";
    }
  }
  private leftEdgePosition: [row: number, column: number, dir: direction] = [0, 0, direction.left];
  private rightEdgePosition: [row: number, column: number, dir: direction] = [0, 0, direction.right];
}
enum direction {
  top,
  down,
  left,
  right
}
