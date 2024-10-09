import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DominoTile } from '../../_models/dominoTile';
import { TileDetails } from '../../_models/tileDetails';
import { TileComponent } from '../../tile/tile.component';

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
  @Input() opponentTiles: number[] = [];
  @Output() endTurn: EventEmitter<void> = new EventEmitter<void>();
  opponentHand: TileDetails[] = [];
  openHand: boolean = false;
  constructor(private ref: ElementRef) {
    this.ref.nativeElement.style.setProperty('--wave-color', "green");
  }
  yourTurn() {
    this.endTurn.emit();
  }
  showOpponentTiles(tiles: TileDetails[]) {
    this.opponentHand = tiles;
    this.openHand = true;
  }
}
