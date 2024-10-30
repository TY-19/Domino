import { Injectable } from "@angular/core";
import { DisplayOptions } from "../_models/displayOptions";
import { GameRules } from "../_models/gameRules";

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  languageKey: string = "language";
  playerNameKey: string = "playerName";
  opponentNameKey: string = "opponentName";
  displayOptionsKey: string = "displayOptions";
  gameRulesKey: string = "gameRules";
  getLanguage(): string | null {
    return localStorage.getItem(this.languageKey);
  }
  setLanguage(language: string) {
    localStorage.setItem(this.languageKey, language);
  }
  getPlayerName(): string | null {
    return localStorage.getItem(this.playerNameKey);
  }
  setPlayerName(playerName: string): void {
    localStorage.setItem(this.playerNameKey, playerName);
  }
  getOpponentName(): string | null {
    return localStorage.getItem(this.opponentNameKey);
  }
  setOpponentName(opponentName: string): void {
    localStorage.setItem(this.opponentNameKey, opponentName);
  }
  getDisplayOptions(): DisplayOptions | null {
    let options = localStorage.getItem(this.displayOptionsKey);
    if(!options) {
      return null;
    }
    return JSON.parse(options);
  }
  setDisplayOptions(options: DisplayOptions): void {
    localStorage.setItem(this.displayOptionsKey, JSON.stringify(options));
  }
  getGameRules(): GameRules | null {
    let rules = localStorage.getItem(this.gameRulesKey);
    if(!rules) {
      return null;
    }
    return JSON.parse(rules);
  }
  setGameRules(rules: GameRules): void {
    localStorage.setItem(this.gameRulesKey, JSON.stringify(rules));
  }
}