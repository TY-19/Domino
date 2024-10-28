import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PlayerStatistic } from "../_models/playerStatistic";
import { baseUrl } from "../app.config";
import { PlayerInfo } from "../_models/playerInfo";

@Injectable({
    providedIn: 'root',
})
export class PlayersService {
    constructor(private http: HttpClient) {

    }
    getPlayersInfo(): Observable<PlayerInfo[]> {
        const url = baseUrl + "/players/";
        return this.http.get<PlayerInfo[]>(url);
    }

    getAllPlayersStatistics(): Observable<PlayerStatistic[]> {
        const url = baseUrl + "/players/statistics";
        return this.http.get<PlayerStatistic[]>(url);
    }
    getPlayerStatistics(playerName: string): Observable<PlayerStatistic> {
        const url = baseUrl + "/players/statistics/" + playerName;
        return this.http.get<PlayerStatistic>(url);
    }
}