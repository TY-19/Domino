import { Component, Input } from '@angular/core';
import { PlayersStatisticsService } from '../../players-statistics/players-statistics.service';
import { PlayerStatistic } from '../../_models/player-statistic';
import { LanguageService } from '../../_shared/language.service';
import { StatisticsTranslation } from '../../_shared/translations';

@Component({
  selector: 'Dom-player-info',
  standalone: true,
  imports: [],
  templateUrl: './player-info.component.html',
  styleUrl: './player-info.component.scss'
})
export class PlayerInfoComponent {
  @Input() playerName: string = null!;
  @Input() currentPoints: number = 0;
  @Input() isTop: boolean = true;
  get names(): StatisticsTranslation | undefined {
    return this.languageService.translation?.statistics;
  }
  playerStatistic: PlayerStatistic = null!;
  showStatistic: boolean = false;
  constructor(private playerStatisticService: PlayersStatisticsService,
    private languageService: LanguageService
  ) {

  }
  ngOnInit() {
    this.playerStatisticService.getPlayerStatistics(this.playerName)
      .subscribe(res => this.playerStatistic = res);
  }
}
