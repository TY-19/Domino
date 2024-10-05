import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { TileComponent } from "../tile/tile.component";
import { GameService } from './game.service';
import { GameView } from '../_models/gameView';
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
  game: GameView = null!;
  // game: GameState = TestGame.getGame();
  // tileDisplays: Map<number, TileDisplay> = new Map<number, TileDisplay>();
  showMessage: boolean = false;
  opponentTiles: number[] = [0, 1, 2, 3, 4, 5, 6];
  activeTile: TileDetails | null = null;

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
  slectTile(tileDetails: TileDetails) {
    this.activeTile = tileDetails;
    console.log("active tile: " + tileDetails.tileId);
  }
  playToSide(isLeft: boolean) {
    if(this.activeTile) {
      let contactEdge = isLeft ? this.game.table.leftFreeEnd : this.game.table.rightFreeEnd;
      if(contactEdge === null) {
        contactEdge = this.activeTile.sideA;
      }
      this.playTile(this.activeTile, contactEdge, isLeft);
      this.activeTile = null;
    }
  }
  playTile(tileDetails: TileDetails, contactEdge: number, placeLeft?: boolean): void {
    let position: number = -1;
    if(contactEdge !== null && contactEdge !== tileDetails.sideA && contactEdge !== tileDetails.sideB) {
      return;
    }
    if(this.game.table.leftFreeEnd === null && this.game.table.rightFreeEnd === null) {
      position = 0;
    } else if(contactEdge === this.game.table.leftFreeEnd && contactEdge === this.game.table.rightFreeEnd) {
      position = placeLeft === null || placeLeft === true
        ? this.game.table.leftPosition! - 1
        : this.game.table.rightPosition! + 1;
    } else if(contactEdge === this.game.table.leftFreeEnd) {
      position = this.game.table.leftPosition! - 1;
    } else if(contactEdge === this.game.table.rightFreeEnd) {
      position = this.game.table.rightPosition! + 1;
    } else {
      console.error(`Cannot play tile to edge ${contactEdge}. Tile details:`);
      console.error(tileDetails);
    }
    
    const tile: DominoTile = {
      tileDetails: tileDetails,
      position: position,
      contactEdge: contactEdge
    };
    console.log("playing tile");
    console.log(tile);
    this.gameService.playTile(tile)
      .subscribe(gs => {
        this.game = gs;
        this.updateChildren();
        console.log(this.game);
    });
  }
  grabTile() {
    this.gameService.grabTile()
      .subscribe(gs => {
        this.game = gs;
        this.updateChildren();
      });
  }
  @HostListener('window:resize')
  onResize() {
    this.gameTable.displayTiles();
  }
  private updateChildren()
  {
    this.gameTable.updateDisplayingTiles(this.game.table.tilesOnTable);
    this.opponentTiles = [];
    for(let i = 0; i < this.game.opponentTilesCount; i++) {
      this.opponentTiles.push(i);
    }
  }
}
