import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'Dom-opponent-hand',
  standalone: true,
  imports: [],
  templateUrl: './opponent-hand.component.html',
  styleUrl: './opponent-hand.component.scss'
})
export class OpponentHandComponent {
  @Input() opponentTiles: number[] = [];
  @Output() endTurn: EventEmitter<void> = new EventEmitter<void>();
  constructor(private ref: ElementRef) {
    this.ref.nativeElement.style.setProperty('--wave-color', "green");
  }
  yourTurn() {
    this.endTurn.emit();
  }
}
