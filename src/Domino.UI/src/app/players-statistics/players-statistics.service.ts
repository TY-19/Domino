import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PlayerStatistic } from "../_models/player-statistic";
import { baseUrl } from "../app.config";

@Injectable({
    providedIn: 'root',
})
export class PlayersStatisticsService {
    constructor(private http: HttpClient) {

    }
    getAllPlayersStatistics(): Observable<PlayerStatistic[]> {
        const url = baseUrl + "/players";
        return this.http.get<PlayerStatistic[]>(url);
    }
}