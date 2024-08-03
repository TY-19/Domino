import { Component } from '@angular/core';
import { TileComponent } from "../tile/tile.component";

@Component({
  selector: 'Dom-game',
  standalone: true,
  imports: [TileComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

}
