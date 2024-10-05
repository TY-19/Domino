import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'Dom-opponent-hand',
  standalone: true,
  imports: [],
  templateUrl: './opponent-hand.component.html',
  styleUrl: './opponent-hand.component.scss'
})
export class OpponentHandComponent {
  @Input() opponentTiles: number[] = [];
  constructor(private ref: ElementRef) {
    this.ref.nativeElement.style.setProperty('--wave-color', "green");
  }
}
