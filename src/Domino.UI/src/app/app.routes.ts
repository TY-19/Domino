import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { GameComponent } from './game/game.component';
import { PlayersStatisticsComponent } from './players-statistics/players-statistics.component';
import { CreateOpponentComponent } from './create-opponent/create-opponent.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: MenuComponent },
    { path: 'game', component: GameComponent },
    { path: 'players-statistics', component: PlayersStatisticsComponent },
    { path: 'create-opponent', component: CreateOpponentComponent },
];
