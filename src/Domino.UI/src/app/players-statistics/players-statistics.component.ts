import { Component, OnInit } from '@angular/core';
import { PlayerStatistic } from '../_models/player-statistic';
import { PlayersStatisticsService } from './players-statistics.service';
import { RouterLink } from '@angular/router';

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
  constructor(private playersStatisticsService: PlayersStatisticsService) {

  }
  ngOnInit(): void {
    this.playersStatisticsService.getAllPlayersStatistics()
      .subscribe(reponse => {
        this.playersStatistics = reponse;
      });
  }
}
