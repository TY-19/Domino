import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    playerNameKey: string = "playerName";
    opponentNameKey: string = "opponentName";
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
}