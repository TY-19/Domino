import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'Dom-market',
  standalone: true,
  imports: [],
  templateUrl: './market.component.html',
  styleUrl: './market.component.scss'
})
export class MarketComponent implements OnInit {
  @Input() count?: number;
  @Input() marketTiles: number[] = [];
  @Output() grabTile: EventEmitter<number> = new EventEmitter<number>();
  ngOnInit(): void {
    if(this.count) {
      this.displayMarketTiles(this.count);
    }
  }
  onDoubleClick(tile: number) {
    this.grabTile.emit(tile);
  }
  displayMarketTiles(count: number): void {
    if(count === this.marketTiles.length) {
      return;
    }
    this.marketTiles = [];
    for(let i = 0; i < count; i++) {
      this.marketTiles.push(i);
    }
  }
}
