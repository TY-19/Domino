import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { TileComponent } from "../tile/tile.component";
import { GameService } from './game.service';
import { GameState } from '../_models/gameState';
import { TestGame } from './testGame';
import { TileDisplay } from '../_models/tileDisplay';
import { GameTableComponent } from "./game-table/game-table.component";
import { OpponentHandComponent } from "./opponent-hand/opponent-hand.component";

@Component({
  selector: 'Dom-game',
  standalone: true,
  imports: [
    TileComponent,
    GameTableComponent,
    OpponentHandComponent
],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  @ViewChild(GameTableComponent) gameTable: GameTableComponent = null!;
  game: GameState = null!;
  // game: GameState = TestGame.getGame();
  tileDisplays: Map<number, TileDisplay> = new Map<number, TileDisplay>();

  constructor(private gameService: GameService) {
  }
  
  ngOnInit(): void {
    if(this.game === null) {
      this.start();
    }
    
  }
  start() {
    this.gameService.startGame()
      .subscribe(gs => {
        console.log(gs);
        this.game = gs;
        console.log(this.game);
      });
  }
  @HostListener('window:resize')
  onResize() {
    this.gameTable.onResize();
  }
}
