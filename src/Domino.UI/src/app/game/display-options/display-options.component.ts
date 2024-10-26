import { Component, EventEmitter, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { ColorPickerComponent } from "./color-picker/color-picker.component";
import { DisplayOptions } from '../../_models/displayOptions';
import { DisplayOptionsService } from './display-options.service';
import { LanguageService } from '../../_shared/language.service';
import { ColorsOptionsTranslation } from '../../_shared/translations';

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
  get optionsNames(): ColorsOptionsTranslation | undefined {
    return this.languageService.translation?.colorsOptions;
  }
  @Output() closeOptions: EventEmitter<void> = new EventEmitter<void>();
  constructor(private displayOptionsService: DisplayOptionsService,
    private languageService: LanguageService
  ) {

  }
  ngOnInit() {
    this.selectedOptions = this.displayOptionsService.getDisplayOptions();
  }
  save() {
    this.displayOptionsService.saveDisplayOptions(this.selectedOptions);
    this.closeOptions.emit();
  }
}
