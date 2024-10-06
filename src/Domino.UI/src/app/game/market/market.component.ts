import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'Dom-market',
  standalone: true,
  imports: [],
  templateUrl: './market.component.html',
  styleUrl: './market.component.scss'
})
export class MarketComponent {
  @Input() marketTiles: number[] = [];
  @Output() grabTile: EventEmitter<number> = new EventEmitter<number>();
  onDoubleClick(tile: number) {
    this.grabTile.emit(tile);
  }
}
