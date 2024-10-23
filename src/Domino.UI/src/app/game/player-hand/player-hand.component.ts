import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TileComponent } from '../../tile/tile.component';
import { TileDetails } from '../../_models/tileDetails';

@Component({
  selector: 'Dom-player-hand',
  standalone: true,
  imports: [
    TileComponent
  ],
  templateUrl: './player-hand.component.html',
  styleUrl: './player-hand.component.scss'
})
export class PlayerHandComponent {
  @Input() playerHand: TileDetails[] = [];
  @Output() selectTile: EventEmitter<TileDetails> = new EventEmitter<TileDetails>();
  @Input() activeTileId?: string;
  clickOnTile(tileDetails: TileDetails) {
    this.selectTile.emit(tileDetails);
  }
}
