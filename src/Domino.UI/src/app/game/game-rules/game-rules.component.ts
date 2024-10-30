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
    console.log(this.gameRules);
    // this.localStorageService.setGameRules(this.gameRules);
  }
  addStarterTile(element: HTMLInputElement) {
    if(element.checkValidity() && !this.gameRules.starterTiles.find(t => t == element.value)) {
      this.gameRules.starterTiles.push(element.value);
    }
  }
  removeStarterTile(id: string) {
    this.gameRules.starterTiles = this.gameRules.starterTiles.filter(t => t !== id);
  }
  addHuntStarterTile(element: HTMLInputElement) {
    if(element.checkValidity() && !this.gameRules.huntStarterTiles.find(t => t == element.value)) {
      this.gameRules.huntStarterTiles.push(element.value);
    }
  }
  removeHuntStarterTile(id: string) {
    this.gameRules.huntStarterTiles = this.gameRules.huntStarterTiles.filter(t => t !== id);
  }
  iterateThrough(toIterate: Record<string, number>): { key: string, value: number }[]  {
    let keyValues: { key: string, value: number }[] = [
      { key: "", value: 5}
    ];
    for(let key in toIterate) {
      keyValues.push({key: key, value: toIterate[key]})
    }
    return keyValues;
  }
}
