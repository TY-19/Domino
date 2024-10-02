import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'Dom-opponent-hand',
  standalone: true,
  imports: [],
  templateUrl: './opponent-hand.component.html',
  styleUrl: './opponent-hand.component.scss'
})
export class OpponentHandComponent implements OnInit {
  @Input() tileCount: number = 7;
  elements: number[] = [];
  constructor(private ref: ElementRef) {
    this.ref.nativeElement.style.setProperty('--wave-color', "green");
  }
  ngOnInit() {
    for(let i = 0; i < this.tileCount; i++) {
      this.elements.push(i);
    }
  }
}
