import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { TileComponent } from "../tile/tile.component";
import { GameService } from './game.service';
import { GameView } from '../_models/gameView';
import { TestGame } from './testGame';
import { GameTableComponent } from "./game-table/game-table.component";
import { OpponentHandComponent } from "./opponent-hand/opponent-hand.component";
import { DominoTile } from '../_models/dominoTile';
import { TileDetails } from '../_models/tileDetails';
import { MarketComponent } from "./market/market.component";
import { PlayerHandComponent } from "./player-hand/player-hand.component";
import { RouterLink } from '@angular/router';
import { DisplayOptionsService } from './display-options/display-options.service';
import { DisplayOptionsComponent } from './display-options/display-options.component';
import { MessageComponent } from "./message/message.component";
import { GameplayService } from './gameplay.service';

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
    MessageComponent
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
  @ViewChild(MarketComponent) market: MarketComponent = null!;
  @ViewChild('message') message: MessageComponent = null!;
  @ViewChild('opponentMessage') opponentMessage: MessageComponent = null!;
  game: GameView = null!;
  // game: GameView = TestGame.getGame();
  showOptions: boolean = false;
  activeTile: TileDetails | null = null;
  currentTurn: number = 0;

  constructor(private gameService: GameService,
    private gameplayService: GameplayService,
    private cdr: ChangeDetectorRef,
    private elemRef: ElementRef,
    private displayOptionsService: DisplayOptionsService
  ) {
  }

  @HostListener('window:resize')
  onResize() {
    this.gameTable.displayTiles();
  }

  ngOnInit(): void {
    this.displayOptionsService.setVariables(this.elemRef);
    this.gameService.getCurrentGame()
      .subscribe((game) => {
        if(game === null) {
          this.startGame();
        } else {
          this.game = game;
          this.cdr.detectChanges();
          this.prepareGame();
        }
    });
  }
  startGame(): void {
    this.gameService.startGame()
      .subscribe(gs => {
        this.game = gs;
        this.cdr.detectChanges();
        this.prepareGame(true);
      });
  }
  private prepareGame(clear?: boolean): void {
    if(clear || this.game.table.tilesOnTable.length <= 0) {
      this.gameTable.prepareTable();
    } else {
      this.gameTable.displayTiles();
    }
    this.opponentHand.showOpponentTiles(this.game);
    this.opponentHand.displayClosedTiles(this.game.opponent.tilesCount);
    this.market.displayMarketTiles(this.game.marketTilesCount);
    this.message.hideMessage();
    this.opponentMessage.hideMessage();
    this.currentTurn = 0;   
  }
  selectTile(tileDetails: TileDetails) {
    this.activeTile = tileDetails;
    let [play, isLeft] = this.gameplayService.moveSelectedTile(tileDetails, this.game)
    if(play) {
      this.playToSide(isLeft);
    } else {
      this.gameTable.showPlaces = true;
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
    let position: number | null = this.gameplayService
      .calculatePositionToPlay(tileDetails, contactEdge, placeLeft, this.game);
    if(position === null) {
      return;
    }
    const tile: DominoTile = {
      tileDetails: tileDetails,
      position: position,
      contactEdge: contactEdge
    };
    this.gameService.playTile(tile)
      .subscribe(gs => {
        this.game = gs;
        this.updateGameState();
    });
  }
  grabTile(index: number) {
    let [canGrab, reason] = this.gameplayService.canGrab(this.game);
    if(!canGrab) {
      this.message.displayMessage(reason);
      if(this.gameplayService.checkForTurnEnd(this.game)) {
        this.endTurn();
      }
    } else {
      this.gameService.grabTile()
        .subscribe(gs => {
          this.game = gs;
          this.updateGameState();
          if(this.gameplayService.checkForTurnEnd(this.game)) {
            this.endTurn();
          }
        });
    }
  }
  endTurn() {
    this.gameService.waitForOpponent()
      .subscribe(gs => {
        this.game = gs;
        this.updateGameState();
        if((!this.game.gameResult || !this.game.gameResult.isEnded)
            && this.gameplayService.checkForTurnEnd(this.game)) {
          this.endTurn();
        }
      });
  }
  
  private updateGameState()
  {
    this.gameTable.updateDisplayingTiles(this.game.table.tilesOnTable);
    this.opponentHand.displayClosedTiles(this.game.opponent.tilesCount);
    if(this.game.gameResult && this.game.gameResult.isEnded) {
      this.message.displayMessage(this.game.gameResult.result);
      this.opponentHand.showOpponentTiles(this.game);
    } else if(this.game.errorMessage) {
      this.message.displayMessage(this.game.errorMessage);
    }
    this.market.displayMarketTiles(this.game.marketTilesCount);
    let [message, newCurrentTurn] = this.gameplayService
      .buildOpponentMessage(this.game.log.events, this.currentTurn, this.game.opponent.name);
    this.opponentMessage.displayMessage(message);
    this.currentTurn = newCurrentTurn;
  }
  changeColorScheme() {
    this.displayOptionsService.setVariables(this.elemRef);
    this.showOptions = !this.showOptions;
  }
}
