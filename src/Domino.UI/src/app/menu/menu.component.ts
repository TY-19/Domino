import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LocalStorageService } from '../_shared/localstorage.service';
import { LanguageSwitchComponent } from "./language-switch/language-switch.component";
import { LanguageService } from '../_shared/language.service';
import { MenuTranslation } from '../_shared/translations';
import { VersionComponent } from "./version/version.component";
import { PlayerGameView } from '../_models/playerGameView';
import { PlayersService } from '../players-statistics/players.service';
import { PlayerInfo } from '../_models/playerInfo';
import { PlayerType } from '../_enums/playerType';

@Component({
  selector: 'Dom-menu',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    LanguageSwitchComponent,
    VersionComponent
],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  get names(): MenuTranslation | undefined {
    return this.languageService.translation?.menu;
  }
  playerName: string = "";
  opponentName: string = "";
  readonly newOpponent: string = "New...";
  editPlayer: boolean = false;
  editOpponent: boolean = false;
  opponents: PlayerInfo[] = [];
  constructor(
    private playersService: PlayersService,
    private languageService: LanguageService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {

  }
  ngOnInit() {
    this.playersService.getPlayersInfo()
      .subscribe(res => this.opponents = res.filter(r => r.type == PlayerType.AI) );
    let playerName = this.localStorageService.getPlayerName();
    if(playerName) {
      this.playerName = playerName;
    } else {
      this.changePlayer("Test");
    }
    let opponentName = this.localStorageService.getOpponentName();
    if(opponentName) {
      this.opponentName = opponentName;
    } else {
      this.changeOpponent("AI");
    }
    
  }
  changePlayer(newName: string) {
    this.localStorageService.setPlayerName(newName);
  }
  changeOpponent(newName: string) {
    if(newName === this.newOpponent) {
      this.router.navigate(['create-opponent']);
    } else {
      this.localStorageService.setOpponentName(newName);
    }
  }
}
