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
import { MarketComponent } from "./market/market.component";
import { LogEvent } from '../_models/logEvent';
import { LocalStorageService } from '../_shared/localstorage.service';
import { PlayerHandComponent } from "./player-hand/player-hand.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'Dom-game',
  standalone: true,
  imports: [
    RouterLink,
    TileComponent,
    GameTableComponent,
    OpponentHandComponent,
    MarketComponent,
    PlayerHandComponent
],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  @ViewChild(GameTableComponent) gameTable: GameTableComponent = null!;
  @ViewChild(OpponentHandComponent) opponentHand: OpponentHandComponent = null!;
  game: GameView = null!;
  // game: GameView = TestGame.getGame();
  // tileDisplays: Map<number, TileDisplay> = new Map<number, TileDisplay>();
  showMessage: boolean = false;
  message: string = "";
  playerHand: TileDetails[] = [];
  opponentTiles: number[] = [0, 1, 2, 3, 4, 5, 6];
  marketTiles: number[] = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ];
  activeTile: TileDetails | null = null;
  
  currentTurn: number = 0;
  opponentMessage: string = "";

  constructor(private gameService: GameService,
    private localStorageService: LocalStorageService
  ) {
  }
  
  ngOnInit(): void {
    if(this.game === null) {
      this.start();
    } 
  }
  start() {
    let playerName = this.localStorageService.getPlayerName();
    let opponentName = this.localStorageService.getOpponentName();
    this.gameService.startGame(playerName, opponentName)
      .subscribe(gs => {
        this.game = gs;
        this.playerHand = this.game.playerHand;
      });
    if(this.gameTable) {
      this.gameTable.tileDisplays = new Map<number, TileDisplay>();
      this.gameTable.leftActive = this.gameTable.def;
      this.gameTable.rightActive = this.gameTable.def;
    }
    if(this.opponentHand) {
      this.opponentHand.openHand = false;
      this.opponentHand.opponentHand = [];
    }
    this.showMessage = false;
    this.message = "";
    this.currentTurn = 0;
    this.opponentMessage = "";
    this.opponentTiles = [0, 1, 2, 3, 4, 5, 6];
    this.marketTiles = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ];
  }
  selectTile(tileDetails: TileDetails) {
    this.activeTile = tileDetails;
    if(this.game.table.leftFreeEnd !== null
      && this.game.table.rightFreeEnd !== null) {
      let movesCount: number = 0;
      let isLeft: boolean | null = null;
      if(tileDetails.sideA === this.game.table.leftFreeEnd
        || tileDetails.sideB === this.game.table.leftFreeEnd) {
        movesCount++;
        isLeft = true;
      }
      if(tileDetails.sideA === this.game.table.rightFreeEnd
        || tileDetails.sideB === this.game.table.rightFreeEnd) {
        movesCount++;
        isLeft = false;
      }
      if(movesCount === 1 && isLeft !== null) {
        this.playToSide(isLeft);
      }  else if(movesCount > 1) {
        this.gameTable.showPlaces = true;
      }
    }
    else {
      this.playToSide(true);
    }
  }
  playToSide(isLeft: boolean) {
    if(this.activeTile) {
      let contactEdge = isLeft === true ? this.game.table.leftFreeEnd : this.game.table.rightFreeEnd;
      if(contactEdge === null) {
        contactEdge = this.activeTile.sideA;
      }
      this.playTile(this.activeTile, contactEdge, isLeft);
      this.activeTile = null;
      this.gameTable.showPlaces = false;
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
    this.gameService.playTile(tile)
      .subscribe(gs => {
        this.game = gs;
        this.updateChildren();
    });
  }
  grabFromMarket(index: number) {
    if(this.game.playerHand.some(t =>
      t.sideA === this.game.table.leftFreeEnd
      || t.sideB === this.game.table.leftFreeEnd
      || t.sideA === this.game.table.rightFreeEnd
      || t.sideB === this.game.table.rightFreeEnd)) {
        this.message = "You have a possible tile to play in your hand. No need to grab another one";
        this.showMessage = true;
    } else {  
      this.grabTile();
    }
  }
  grabTile() {
    this.gameService.grabTile()
      .subscribe(gs => {
        this.game = gs;
        this.updateChildren();
      });
  }
  endTurn() {
    this.gameService.waitForOpponent()
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
    this.playerHand = this.game.playerHand;
    this.opponentTiles = [];
    for(let i = 0; i < this.game.opponentTilesCount; i++) {
      this.opponentTiles.push(i);
    }
    if(this.game.gameStatus.isEnded) {
      this.showMessage = true;
      this.message = this.game.gameStatus.result;
      let tiles: TileDetails[] = [];
      if (this.game.gameStatus.endHands.hasOwnProperty(this.game.opponentName)) {
        tiles = this.game.gameStatus.endHands[this.game.opponentName];
      }
      this.opponentHand.showOpponentTiles(tiles);
    }
    if(this.game.marketTilesCount < this.marketTiles.length)
    {
      for(let i = 0; i < this.marketTiles.length - this.game.marketTilesCount; i++) {
        this.marketTiles.pop();
      }
    }
    this.buildOpponentMessage(this.game.log.events);
  }
  private buildOpponentMessage(events: LogEvent[]) {
    let newEvents = events.filter(e => e.moveNumber > this.currentTurn &&
      e.playerName === this.game.opponentName).sort((a, b ) => {
        return a.moveNumber - b.moveNumber;
      });
    let message = "";
    for(let event of newEvents) {
      if(event.type === 1) {
        message += "I played " + event.tile.tileDetails.tileId + ".\n";
      } else if(event.type === 2) {
        message += "I grabbed a tile.\n";
      }
      this.currentTurn = event.moveNumber;
    }
    this.opponentMessage = message;
  }
}
