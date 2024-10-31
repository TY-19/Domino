import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PlayerStatistic } from "../_models/playerStatistic";
import { baseUrl } from "../app.config";
import { PlayerInfo } from "../_models/playerInfo";
import { StrategyCoefficients } from "../_models/strategyCoefficients";
import { Player } from "../_models/player";

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
    createPlayer(playerName: string, isAi: boolean, strategyCoeffs?: StrategyCoefficients) : Observable<Player> {
        const url = baseUrl + "/players";
        let body = {
            playerName: playerName,
            isAi: isAi,
            coefficients: strategyCoeffs,
        };
        return this.http.post<Player>(url, body);
    }
}