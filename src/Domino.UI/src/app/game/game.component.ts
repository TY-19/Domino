import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { TileComponent } from "../tile/tile.component";
import { GameService } from './game.service';
import { GameState } from '../_models/gameState';
import { TestGame } from './testGame';
import { TileDisplay } from '../_models/tileDisplay';
import { GameTableComponent } from "./game-table/game-table.component";
import { OpponentHandComponent } from "./opponent-hand/opponent-hand.component";
import { DominoTile } from '../_models/dominoTile';
import { TileDetails } from '../_models/tileDetails';

@Component({
  selector: 'Dom-game',
  standalone: true,
  imports: [
    TileComponent,
    GameTableComponent,
    OpponentHandComponent
],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  @ViewChild(GameTableComponent) gameTable: GameTableComponent = null!;
  game: GameState = null!;
  // game: GameState = TestGame.getGame();
  // tileDisplays: Map<number, TileDisplay> = new Map<number, TileDisplay>();
  showMessage: boolean = false;

  constructor(private gameService: GameService) {
  }
  
  ngOnInit(): void {
    if(this.game === null) {
      this.start();
    }
    
  }
  start() {
    this.gameService.startGame()
      .subscribe(gs => {
        this.game = gs;
      });
    if(this.gameTable) {
      this.gameTable.tileDisplays = new Map<number, TileDisplay>();
    }
  }
  playTile(tileDetails: TileDetails) {
    let ends = this.getEnds();
    let position: number = -1;
    let contactEdge = -1;
    if(ends.length === 0) {
      position = 0;
      contactEdge = tileDetails.sideA;
    } else {
      let leftFreeEnd = this.getFreeEnds(ends[0]);
      let rightFreeEnd = this.getFreeEnds(ends[1]);
      console.log("left: " + leftFreeEnd);
      console.log("right: " + rightFreeEnd);
      if(tileDetails.sideA == leftFreeEnd) {
        contactEdge = tileDetails.sideA;
        position = ends[0].tile.position - 1;
      } else if(tileDetails.sideB == leftFreeEnd) {
        contactEdge = tileDetails.sideB;
        position = ends[0].tile.position - 1;
      } else if(tileDetails.sideA == rightFreeEnd) {
        contactEdge = tileDetails.sideA;
        position = ends[1].tile.position + 1;
      } else if(tileDetails.sideB == rightFreeEnd) {
        contactEdge = tileDetails.sideB;
        position = ends[1].tile.position + 1;
      }
    }
    const tile: DominoTile = {
      tileDetails: tileDetails,
      position: position,
      contactEdge: contactEdge,
      freeEnd: contactEdge === tileDetails.sideA ? tileDetails.sideB : tileDetails.sideA
    };
    console.log(tile);
    this.gameService.playTile(tile)
      .subscribe(gs => {
        this.game = gs;
        this.gameTable.updateDisplayingTiles(gs.table.tilesOnTable);
    });
  }
  grabTile() {
    this.gameService.grabTile()
      .subscribe(gs => {
        this.game = gs;
      });
  }
  @HostListener('window:resize')
  onResize() {
    this.gameTable.displayTiles();
  }

  private getEnds(): TileDisplay[] {
    console.log("tileDisplays");
    console.log(this.gameTable.tileDisplays);
    if(this.gameTable.tileDisplays.size === 0) {
      return [];
    }
    let left = this.gameTable.tileDisplays.get(Math.min(...this.gameTable.tileDisplays.keys()));
    let right = this.gameTable.tileDisplays.get(Math.max(...this.gameTable.tileDisplays.keys()));
    return [left!, right!];
  }
  private getFreeEnds(tileDisplay: TileDisplay): number {
    if(tileDisplay.tile.tileDetails.sideA === tileDisplay.tile.tileDetails.sideB) {
      return tileDisplay.tile.tileDetails.sideA;
    } 
    return tileDisplay.tile.contactEdge === tileDisplay.tile.tileDetails.sideA
      ? tileDisplay.tile.tileDetails.sideB
      : tileDisplay.tile.tileDetails.sideA;
  }
}
