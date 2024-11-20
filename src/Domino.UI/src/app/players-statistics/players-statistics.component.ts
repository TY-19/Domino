import { Component, OnInit } from '@angular/core';
import { PlayerStatistic } from '../_models/playerStatistic';
import { PlayersService } from './players.service';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../_shared/language.service';
import { StatisticsTranslation } from '../_shared/translations';

@Component({
  selector: 'Dom-players-statistics',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './players-statistics.component.html',
  styleUrl: './players-statistics.component.scss'
})
export class PlayersStatisticsComponent implements OnInit {
  playersStatistics: PlayerStatistic[] = [];
  get names(): StatisticsTranslation | undefined {
    return this.languageService.translation?.statistics;
  }
  activeColumn: string = "";
  private sortingOrder: string = "Asc";
  private sortedByColumn: string = "playerName";
  private columns: { [key: string]: (ps: PlayerStatistic) => number | string } = {
    "playerName": ps => ps.playerName,
    "gamesPlayed": ps => ps.gamesPlayed,
    "wins": ps => ps.wins,
    "normalVictoryWins": ps => ps.normalVictoryWins,
    "goatWins": ps => ps.goatWins,
    "officerWins": ps => ps.officerWins,
    "generalWins": ps => ps.generalWins,
    "wasHunter": ps => ps.wasHunter,
    "successfulHunt": ps => ps.successfulHunt,
    "wasHunted": ps => ps.wasHunted,
    "clearedPoints": ps => ps.clearedPoints,
    "loses": ps => ps.loses,
    "normalVictoryLoses": ps => ps.normalVictoryLoses,
    "goatLoses": ps => ps.goatLoses,
    "officerLoses": ps => ps.officerLoses,
    "generalLoses": ps => ps.generalLoses,
    "draws": ps => ps.draws,
    "totalPointsLeftWith": ps => ps.totalPointsLeftWith
  }
  constructor(private playersStatisticsService: PlayersService,
    private languageService: LanguageService
  ) {

  }
  ngOnInit(): void {
    this.playersStatisticsService.getAllPlayersStatistics()
      .subscribe(reponse => {
        this.playersStatistics = reponse;
      });
  }
  sort(column: string) {
    this.sortingOrder = this.activeColumn === column && this.sortingOrder === "Desc" ? "Asc" : "Desc";
    this.activeColumn = column;
    this.sortedByColumn = column;
    let sortingFunc = this.columns[column];
    if(this.sortingOrder === "Asc") {
      this.playersStatistics.sort((a, b) => a === b ? 0 : sortingFunc(a) > sortingFunc(b) ? 1 : -1);
    } else if(this.sortingOrder === "Desc") {
      this.playersStatistics.sort((a, b) => a === b ? 0 : sortingFunc(a) < sortingFunc(b) ? 1 : -1);
    } else {
      return;
    }
  }
  getProperty(ps: PlayerStatistic) {
    return ps.clearedPoints;
  }
  isActiveColumn(column: string): string {
    return this.activeColumn === column ? 'active' : '';
  }
}
