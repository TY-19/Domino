import { Injectable } from "@angular/core";
import { DisplayOptions } from "../_models/displayOptions";

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    playerNameKey: string = "playerName";
    opponentNameKey: string = "opponentName";
    displayOptionsKey: string = "displayOptions";
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
}