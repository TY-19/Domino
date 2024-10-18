import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LocalStorageService } from '../_shared/localstorage.service';

@Component({
  selector: 'Dom-menu',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  playerName: string = "";
  opponentName: string = "";
  editPlayer: boolean = false;
  editOpponent: boolean = false;
  constructor(private localStorageService: LocalStorageService) {

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
