import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { baseUrl } from "../app.config";
import { GameView } from "../_models/gameView";
import { catchError, Observable, of, throwError } from "rxjs";
import { DominoTile } from "../_models/dominoTile";
import { LocalStorageService } from "../_shared/localstorage.service";

@Injectable({
    providedIn: 'root',
})

export class GameService {
  constructor(private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {

  }
  getCurrentGame(): Observable<GameView | null> {
    let url: string = baseUrl + "/Game/current";
    let params = this.getPlayerNameQueryParameter(new HttpParams());
    return this.http.get<GameView>(url, { params })
      .pipe(catchError(() => of(null)));
  }
  startGame(): Observable<GameView> {
    let url: string = baseUrl + "/Game/start";
    let params = this.getPlayerNameQueryParameter(new HttpParams());
    let opponentName = this.localStorageService.getOpponentName();
    if(opponentName) {
      params = params.set('opponentName', opponentName);
    }
    return this.http.get<GameView>(url, { params });
  }
  playTile(tile: DominoTile): Observable<GameView> {
    const url: string = baseUrl + "/Game/play";
    let params = this.getPlayerNameQueryParameter(new HttpParams());
    const isLeft: boolean | null = tile.position == 0 ? null : tile.position < 0;
    const playTileDto = {
      tileId: tile.tileDetails.tileId,
      isLeft: isLeft
    };
    return this.http.post<GameView>(url, playTileDto, { params });
  }
  grabTile(): Observable<GameView> {
    const url: string = baseUrl + "/Game/grab";
    let params = this.getPlayerNameQueryParameter(new HttpParams());
    return this.http.get<GameView>(url, { params });
  }
  waitForOpponent(): Observable<GameView> {
    const url: string = baseUrl + "/Game/endTurn";
    let params = this.getPlayerNameQueryParameter(new HttpParams());
    return this.http.get<GameView>(url, { params });
  }
  private getPlayerNameQueryParameter(params: HttpParams): HttpParams {
    let playerName = this.localStorageService.getPlayerName();
    if(playerName) {
      params = params.set('playerName', playerName);
    }
    return params;
  }
}