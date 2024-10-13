import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { baseUrl } from "../app.config";
import { GameView } from "../_models/gameView";
import { Observable } from "rxjs";
import { TileDisplay } from "../_models/tileDisplay";
import { DominoTile } from "../_models/dominoTile";

@Injectable({
    providedIn: 'root',
})

export class GameService {
    constructor(private http: HttpClient) {

    }
    startGame(playerName: string | null, opponentName: string | null): Observable<GameView> {
        let url: string = baseUrl + "/Game/start";
        if(playerName) {
            url += "?playerName=" + playerName;
            if(opponentName) {
                url += "&opponentName=" + opponentName;
            }
        }
        return this.http.get<GameView>(url);
    }
    playTile(tile: DominoTile): Observable<GameView> {
        const url: string = baseUrl + "/Game/play";
        const isLeft: boolean | null = tile.position == 0 ? null : tile.position < 0;
        const playTileDto = {
            tileId: tile.tileDetails.tileId,
            isLeft: isLeft
        };
        return this.http.post<GameView>(url, playTileDto);
    }
    grabTile(): Observable<GameView> {
        const url: string = baseUrl + "/Game/grab";
        return this.http.get<GameView>(url);
    }
    waitForOpponent(): Observable<GameView> {
        const url: string = baseUrl + "/Game/endTurn";
        return this.http.get<GameView>(url);
    }
}