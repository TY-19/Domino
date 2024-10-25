import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LocalStorageService } from '../_shared/localstorage.service';
import { LanguageSwitchComponent } from "./language-switch/language-switch.component";
import { LanguageService } from '../_shared/language.service';
import { MenuTranslation } from '../_shared/translations';
import { VersionComponent } from "./version/version.component";

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
    return this.languageService.translation?.interface.menu;
  }
  playerName: string = "";
  opponentName: string = "";
  editPlayer: boolean = false;
  editOpponent: boolean = false;
  constructor(protected languageService: LanguageService,
    private localStorageService: LocalStorageService) {

  }
  ngOnInit() {
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
    this.localStorageService.setOpponentName(newName);
  }
}
