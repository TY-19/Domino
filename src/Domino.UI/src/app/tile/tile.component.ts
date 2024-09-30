import { AfterViewInit, Component, ElementRef, HostListener, Input, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { TileDetails } from '../_models/tileDetails';

@Component({
  selector: 'Dom-tile',
  standalone: true,
  imports: [],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.scss'
})
export class TileComponent implements AfterViewInit {
  private dotsHorizontal: Map<number, string[]> = new Map<number, string[]>([
    [0, []],
    [1, ['center-dot']],
    [2, ['top-left-dot', 'bottom-right-dot']],
    [3, ['top-left-dot', 'center-dot', 'bottom-right-dot']],
    [4, ['top-left-dot', 'top-right-dot', 'bottom-left-dot', 'bottom-right-dot']],
    [5, ['top-left-dot', 'top-right-dot', 'center-dot', 'bottom-left-dot', 'bottom-right-dot']],
    [6, ['top-left-dot', 'top-center-dot', 'top-right-dot', 'bottom-left-dot', 'bottom-center-dot', 'bottom-right-dot']]
  ]);
  private dotsVertical: Map<number, string[]> = new Map<number, string[]>([
    [0, []],
    [1, ['center-dot']],
    [2, ['top-right-dot', 'bottom-left-dot']],
    [3, ['top-right-dot', 'center-dot', 'bottom-left-dot']],
    [4, ['top-left-dot', 'top-right-dot', 'bottom-left-dot', 'bottom-right-dot']],
    [5, ['top-left-dot', 'top-right-dot', 'center-dot', 'bottom-left-dot', 'bottom-right-dot']],
    [6, ['top-left-dot', 'middle-left-dot', 'top-right-dot', 'bottom-left-dot', 'middle-right-dot', 'bottom-right-dot']]
  ]);
  private isViewInitialized: boolean = false;

  @Input() tile: TileDetails = null!;
  @Input() isHorizontal: boolean = false;
  @ViewChild('squareOne') squareOne!: ElementRef<HTMLDivElement>;
  @ViewChild('squareTwo') squareTwo!: ElementRef<HTMLDivElement>;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.isViewInitialized && changes['isHorizontal']) {
      this.clearTile();
      this.buildTile();
    }
  }

  ngAfterViewInit(): void {
    this.buildTile();
    this.isViewInitialized = true;
  }
  
  private buildTile() {
    let squareOneDots = this.buildSquare(this.tile?.sideA ?? 0);
    for(let dot of squareOneDots) {
      this.squareOne.nativeElement.appendChild(dot);
    }
    let squareTwoDots = this.buildSquare(this.tile?.sideB ?? 0);
    for(let dot of squareTwoDots) {
      this.squareTwo.nativeElement.appendChild(dot);
    }
  }
  private buildSquare(dotsCount: number): any[] {
    let children: any[] = [];
    let classes: string[] | undefined = [];
    if(this.isHorizontal) {
      classes = this.dotsHorizontal.get(dotsCount);
    }
    else {
      classes = this.dotsVertical.get(dotsCount);
    }
    if(classes) {
      for(let aclass of classes) {
        let div: any = this.renderer.createElement('div');
        div.classList.add('dot');
        div.classList.add(aclass);
        children.push(div);
      }
    }
    return children;
  }
  private clearTile(): void {
    while (this.squareOne.nativeElement.firstChild) {
      this.squareOne.nativeElement.removeChild(this.squareOne.nativeElement.firstChild);
    }
    while (this.squareTwo.nativeElement.firstChild) {
      this.squareTwo.nativeElement.removeChild(this.squareTwo.nativeElement.firstChild);
    }
  }
}
