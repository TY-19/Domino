import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { GameComponent } from './game/game.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: MenuComponent },
    { path: 'game', component: GameComponent },
];
