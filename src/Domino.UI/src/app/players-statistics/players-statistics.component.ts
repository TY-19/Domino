import { Component, OnInit } from '@angular/core';
import { PlayerStatistic } from '../_models/player-statistic';
import { PlayersStatisticsService } from './players-statistics.service';
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
  constructor(private playersStatisticsService: PlayersStatisticsService,
    private languageService: LanguageService
  ) {

  }
  ngOnInit(): void {
    this.playersStatisticsService.getAllPlayersStatistics()
      .subscribe(reponse => {
        this.playersStatistics = reponse;
      });
  }
}
