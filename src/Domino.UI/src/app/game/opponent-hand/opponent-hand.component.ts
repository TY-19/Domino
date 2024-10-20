import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TileDetails } from '../../_models/tileDetails';
import { TileComponent } from '../../tile/tile.component';
import { GameView } from '../../_models/gameView';

@Component({
  selector: 'Dom-opponent-hand',
  standalone: true,
  imports: [
    TileComponent
  ],
  templateUrl: './opponent-hand.component.html',
  styleUrl: './opponent-hand.component.scss'
})
export class OpponentHandComponent {
  closedTiles: number[] = [];
  opponentHand: TileDetails[] = [];
  openHand: boolean = false;
  constructor(private ref: ElementRef) {
    this.ref.nativeElement.style.setProperty('--wave-color', "green");
  }
  showOpponentTiles(game: GameView) {
    this.openHand = game.gameResult?.isEnded ?? false;
    if(game.gameResult && game.gameResult.isEnded === true) {
      this.opponentHand = game.gameResult.playerResultRecords?.find(r => 
        r.playerName == game.opponent.name)?.endHand ?? [];
    }
  }
  displayClosedTiles(count: number) {
    this.closedTiles = [];
    for(let i = 0; i < count; i++) {
      this.closedTiles.push(i);
    }
  }
}
