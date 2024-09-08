import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { baseUrl } from "../app.config";
import { GameState } from "../_models/gameState";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class GameService {
    constructor(private http: HttpClient) {

    }
    startGame(): Observable<GameState> {
        let url: string = baseUrl + "/Game/start";
        return this.http.get<GameState>(url);
    }
}