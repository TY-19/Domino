import { Component, Input } from '@angular/core';
import { LogEvent } from '../../_models/logEvent';
import { LanguageService } from '../../_shared/language.service';
import { LogTranslation } from '../../_shared/translations';

@Component({
  selector: 'Dom-game-log',
  standalone: true,
  imports: [],
  templateUrl: './game-log.component.html',
  styleUrl: './game-log.component.scss'
})
export class GameLogComponent {
  @Input() log: LogEvent[] = [];
  get names(): LogTranslation | undefined {
    return this.languageService.translation?.log;
  }
  constructor(private languageService: LanguageService) {

  }
  getText(event: LogEvent): string {
    if(event.type === 1) {
      return this.names?.playTile + event.tile.tileDetails.tileId + ".";
    } else if(event.type === 2) {
      return this.names?.grabTile ?? "";
    } 
    return "";
  }
}
