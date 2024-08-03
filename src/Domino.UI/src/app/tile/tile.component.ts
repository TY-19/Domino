import { AfterViewInit, Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { DominoTile } from '../_models/domino-tile';

@Component({
  selector: 'Dom-tile',
  standalone: true,
  imports: [],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.scss'
})
export class TileComponent implements AfterViewInit {

  tile?: DominoTile
  constructor(private el: ElementRef, private renderer: Renderer2) {
    
  }
  
  ngAfterViewInit(): void {
    this.updateDimensions();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateDimensions();
  }

  private updateDimensions(): void {
    const parent = this.el.nativeElement.parentElement;
    const parentHeight = parent.offsetHeight;
    const elementHeight = parentHeight * 0.05;
    const elementWidth = elementHeight * 2;

    this.renderer.setStyle(this.el.nativeElement.querySelector('.domino-tile'), 'height', `${elementHeight}px`);
    this.renderer.setStyle(this.el.nativeElement.querySelector('.domino-tile'), 'width', `${elementWidth}px`);
  }
}
