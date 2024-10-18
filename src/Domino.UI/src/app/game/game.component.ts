import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
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
import { DisplayOptionsService } from './display-options/display-options.service';
import { DisplayOptionsComponent } from './display-options/display-options.component';

@Component({
  selector: 'Dom-game',
  standalone: true,
  imports: [
    RouterLink,
    TileComponent,
    GameTableComponent,
    OpponentHandComponent,
    MarketComponent,
    PlayerHandComponent,
    DisplayOptionsComponent,
],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  host: {
    class: 'game',
  }
})
export class GameComponent implements OnInit {
  @ViewChild(GameTableComponent) gameTable: GameTableComponent = null!;
  @ViewChild(OpponentHandComponent) opponentHand: OpponentHandComponent = null!;
  game: GameView = null!;
  // game: GameView = TestGame.getGame();
  // tileDisplays: Map<number, TileDisplay> = new Map<number, TileDisplay>();
  showOptions: boolean = false;
  showMessageInner: boolean = false;
  get showMessage(): boolean {
    return this.showMessageInner;
  }
  set showMessage(show: boolean) {
    this.showMessageInner = show;
    if(show === true) {
      setTimeout(() => this.showMessageInner = false, 3000);
    }
  }
  message: string = "";
  playerHand: TileDetails[] = [];
  opponentTiles: number[] = [];
  marketTiles: number[] = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ];
  activeTile: TileDetails | null = null;
  
  currentTurn: number = 0;
  opponentMessage: string = "";

  constructor(private gameService: GameService,
    private localStorageService: LocalStorageService,
    private elemRef: ElementRef,
    private displayOptionsService: DisplayOptionsService
  ) {
  }
  
  ngOnInit(): void {
    this.displayOptionsService.setVariables(this.elemRef);
    this.gameService.getCurrentGame()
      .subscribe((game) => {
        if(game === null) {
          this.startGame();
        } else {
          this.game = game;
          this.playerHand = this.game.playerHand;
          this.prepareTable();
        }
    });
  }
  startGame(): void {
    this.gameService.startGame()
      .subscribe(gs => {
        this.game = gs;
        this.playerHand = this.game.playerHand;
        this.prepareTable();
      });
  }
  prepareTable(): void {
    if(this.gameTable) {
      this.gameTable.tileDisplays = new Map<number, TileDisplay>();
      this.gameTable.leftActive = this.gameTable.def;
      this.gameTable.rightActive = this.gameTable.def;
    }
    if(this.opponentHand) {
      this.opponentHand.openHand = this.game.gameStatus.isEnded;
      if(this.game.gameStatus.isEnded === true) {
        this.opponentHand.showOpponentTiles(this.game.gameStatus.endHands[this.game.opponentName])
      }
    }
    this.showMessage = false;
    this.message = "";
    this.currentTurn = 0;
    this.opponentMessage = "";
    this.opponentTiles = [];
    for(let i = 0; i < this.game.opponentTilesCount; i++) {
      this.opponentTiles.push(i);
    }
    this.marketTiles = [];
    for(let i = 0; i < this.game.marketTilesCount; i++) {
      this.marketTiles.push(i);
    }
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
    if(this.hasTilesToPlay()) {
        this.message = "You have a possible tile to play in your hand. No need to grab another one";
        this.showMessage = true;
    } else if(this.game.playerGrabInRow >= this.game.gameRules.maxGrabsInRow) {
      this.message = "You grab maximum allowed number of tiles in a row: " + this.game.playerGrabInRow;
      this.showMessage = true;
      this.endTurn();
    } else if(this.game.marketTilesCount <= this.game.gameRules.minLeftInMarket) {
      this.message = "You cannot grab last " + this.game.gameRules.minLeftInMarket + " tile(s) from the market.";
      this.showMessage = true;
      this.endTurn();
    } else {
      this.grabTile();
    }
  }
  private hasTilesToPlay(): boolean {
    return this.game.playerHand.some(t =>
      t.sideA === this.game.table.leftFreeEnd
      || t.sideB === this.game.table.leftFreeEnd
      || t.sideA === this.game.table.rightFreeEnd
      || t.sideB === this.game.table.rightFreeEnd);
  }
  private canGrabAnotherTile(): boolean {
    return this.game.playerGrabInRow < this.game.gameRules.maxGrabsInRow
      && this.game.marketTilesCount > this.game.gameRules.minLeftInMarket;
  }
  grabTile() {
    this.gameService.grabTile()
      .subscribe(gs => {
        this.game = gs;
        this.updateChildren();
        if(!this.hasTilesToPlay() && !this.canGrabAnotherTile()) {
          this.endTurn();
        }
      });
  }
  endTurn() {
    this.gameService.waitForOpponent()
      .subscribe(gs => {
        this.game = gs;
        this.updateChildren();
        if(!this.hasTilesToPlay() && !this.canGrabAnotherTile()) {
          this.endTurn();
        }
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
    } else if(this.game.errorMessage) {
      this.showMessage = true;
      this.message = this.game.errorMessage;
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
  changeColorScheme() {
    this.displayOptionsService.setVariables(this.elemRef);
    this.showOptions = !this.showOptions;
  }
}
