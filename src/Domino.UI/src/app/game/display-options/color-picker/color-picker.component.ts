import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'Dom-color-picker',
  standalone: true,
  imports: [],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss'
})
export class ColorPickerComponent implements AfterViewInit {
  @Input() backgroundColor: string | null = null;
  @Output() backgroundColorChange: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('SelectedElem') selectedElem: ElementRef = null!;
  showOptions: boolean = false;
  overColor: string = "";
  colors: string[] = [
    // 'gray', 'zinc', 'neutral',
    'slate', 'stone', 'red',
    'orange', 'amber', 'yellow', 'lime', 'green',
    'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo',
    'violet', 'purple', 'fuchsia', 'pink', 'rose'
  ];
  intensities: string[] = ['100', '200', '300', '400', '500', '600', '700', '800', '900'];
  ngAfterViewInit() {
    if(this.backgroundColor !== null) {
      (this.selectedElem.nativeElement as HTMLDivElement).style.backgroundColor = this.backgroundColor;
    }
  }
  changeState(target: EventTarget | null, color: string) {
    this.overColor = this.overColor === color ? "" : color;
    this.selectColor(target);
  }
  selectColor(target: EventTarget | null) {
    this.backgroundColor = this.getColor(target as HTMLDivElement);
    (this.selectedElem.nativeElement as HTMLDivElement).style.backgroundColor = this.backgroundColor;
    this.backgroundColorChange.emit(this.backgroundColor);
  }
  getColor(elem: HTMLDivElement): string {
    return getComputedStyle(elem)
      .getPropertyValue('background-color');
  }
}
