import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { baseUrl } from "../app.config";
import { GameState } from "../_models/gameState";
import { Observable } from "rxjs";
import { TileDisplay } from "../_models/tileDisplay";
import { DominoTile } from "../_models/dominoTile";

@Injectable({
    providedIn: 'root',
})

export class GameService {
    constructor(private http: HttpClient) {

    }
    startGame(): Observable<GameState> {
        const url: string = baseUrl + "/Game/start";
        return this.http.get<GameState>(url);
    }
    playTile(tile: DominoTile): Observable<GameState> {
        const url: string = baseUrl + "/Game/play";
        const isLeft: boolean | null = tile.position == 0 ? null : tile.position < 0;
        const playTileDto = {
            tileId: tile.tileDetails.tileId,
            contactEdge: tile.contactEdge,
            isLeft: isLeft
        };
        return this.http.post<GameState>(url, playTileDto);
    }
    grabTile(): Observable<GameState> {
        const url: string = baseUrl + "/Game/grab";
        return this.http.get<GameState>(url);
    }
}