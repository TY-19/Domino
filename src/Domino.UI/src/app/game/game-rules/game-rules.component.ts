import { Component } from '@angular/core';
import { LocalStorageService } from '../../_shared/localstorage.service';
import { GameRules } from '../../_models/gameRules';
import { defaultRules } from '../../_defaults/defaultRules';
import { LanguageService } from '../../_shared/language.service';
import { RulesTranslation } from '../../_shared/translations';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'Dom-game-rules',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './game-rules.component.html',
  styleUrl: './game-rules.component.scss'
})
export class GameRulesComponent {
  gameRules: GameRules = null!;
  get names(): RulesTranslation | undefined {
    return this.languageService.translation?.rules;
  };
  constructor(private languageService: LanguageService,
    private localStorageService: LocalStorageService) {
    
  }
  ngOnInit() {
    this.gameRules = this.localStorageService.getGameRules() ?? defaultRules;
  }
  saveRules() {
    this.localStorageService.setGameRules(this.gameRules);
  }
  setDefaultRules() {
    this.gameRules = defaultRules;
  }
  addTile(element: HTMLInputElement, collection: string[]) {
    if(element.checkValidity() && !collection.find(t => t == element.value)) {
      collection.push(element.value);
    }
  }
  removeTile(id: string, type: string) {
    if(type === "starters") {
      this.gameRules.starterTiles = this.gameRules.starterTiles.filter(t => t !== id);
    } else if(type === "huntStarters") {
      this.gameRules.huntStarterTiles = this.gameRules.huntStarterTiles.filter(t => t !== id);
    }
  }
  iterateThrough(toIterate: Record<string, number>): { key: string, value: number }[]  {
    let keyValues: { key: string, value: number }[] = [];
    for(let key in toIterate) {
      keyValues.push({key: key, value: toIterate[key]})
    }
    return keyValues;
  }
  addRecord(keyElem: HTMLInputElement, valueElem: HTMLInputElement, collection: Record<string, number>) {
    if(keyElem.checkValidity() && valueElem.checkValidity() && Number.isInteger(Number.parseInt(valueElem.value))) {
      collection[keyElem.value] = Number.parseInt(valueElem.value);
    }
  }
  removeRecord(key: string, collection: Record<string, number>) {
    delete collection[key];
  }
}
