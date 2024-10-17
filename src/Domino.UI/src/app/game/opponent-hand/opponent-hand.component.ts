import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  opponentHand: TileDetails[] = [];
  openHand: boolean = false;
  constructor(private ref: ElementRef) {
    this.ref.nativeElement.style.setProperty('--wave-color', "green");
  }
  showOpponentTiles(tiles: TileDetails[]) {
    this.opponentHand = tiles;
    this.openHand = true;
  }
}
