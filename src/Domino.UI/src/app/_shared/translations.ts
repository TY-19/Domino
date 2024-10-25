export interface Translation {
  interface: {
    menu: MenuTranslation;
    game: GameTranslation;
  }
}
export interface MenuTranslation {
  startGame: string;
  changePlayer: string;
  typePlayerName: string;
  setOpponent: string;
  selectOpponent: string;
  save: string;
  statistics: string;
}
export interface GameTranslation {
  start: string;
}
