import { Component } from '@angular/core';
import { TileComponent } from "../tile/tile.component";
import { GameService } from './game.service';
import { GameState } from '../_models/gameState';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'Dom-game',
  standalone: true,
  imports: [
    JsonPipe,
    TileComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  game: GameState = null!;
  constructor(private gameService: GameService) {
    
  }
  ngOnInit() {
    if(this.game === null) {
      this.start();
    }
  }
  start() {
    this.gameService.startGame()
      .subscribe(gs => this.game = gs);
  }
}
