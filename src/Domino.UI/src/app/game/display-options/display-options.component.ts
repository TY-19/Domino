import { Component, EventEmitter, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { ColorPickerComponent } from "./color-picker/color-picker.component";
import { DisplayOptions } from '../../_models/displayOptions';
import { DisplayOptionsService } from './display-options.service';

@Component({
  selector: 'Dom-display-options',
  standalone: true,
  imports: [
    ColorPickerComponent
  ],
  templateUrl: './display-options.component.html',
  styleUrl: './display-options.component.scss'
})
export class DisplayOptionsComponent implements OnInit {
  selectedOptions: DisplayOptions = null!;
  @Output() closeOptions: EventEmitter<void> = new EventEmitter<void>();
  constructor(private displayOptionsService: DisplayOptionsService) {

  }
  ngOnInit() {
    this.selectedOptions = this.displayOptionsService.getDisplayOptions();
  }
  save() {
    this.displayOptionsService.saveDisplayOptions(this.selectedOptions);
    this.closeOptions.emit();
  }
  // ngOnDestroy() {
  //   this.save();
  // }
}
