import { ErrorType } from "../_enums/errorType";
import { VictoryType } from "../_enums/victoryType";

export interface Translation {
  menu: MenuTranslation;
  game: GameTranslation;
  hints: HintTranslation;
  colorsOptions: ColorsOptionsTranslation;
  opponentPhrases: OpponentPhrasesTranslation;
  errors: Record<ErrorType, string>;
  results: Record<VictoryType, string>;
  statistics: StatisticsTranslation;
  log: LogTranslation;
  rules: RulesTranslation;
  strategyCoeffs: StrategyCoeffsTranslation;
}
export interface MenuTranslation {
  startGame: string;
  changePlayer: string;
  typePlayerName: string;
  setOpponent: string;
  selectOpponent: string;
  createNew: string;
  create: string;
  save: string;
  statistics: string;
}
export interface GameTranslation {
  start: string;
  menu: string;
  colors: string;
  preference: string;
  rules: string;
  market: string;
  log: string;
  impossibleMove: string;
  doublePlay: string;
  yes: string;
  no: string;
}
export interface HintTranslation {
  noNeedToGrab: string;
  noMoreGrabsInRow: string;
  noGrabsLastTiles: string;
}
export interface OpponentPhrasesTranslation {
  iPlayed: string;
  iGrabbed: string;
}
export interface ColorsOptionsTranslation {
  instruction: string;
  save: string;
  tableBg: string;
  dominoPrimary: string;
  dominoDots: string;
  dominoLine: string;
  dominoBackPrimary: string;
  dominoBackSecondary: string;
  messageText: string;
  messageBg: string;
  menuText: string;
  menuBg: string;
  startText: string;
  startBg: string;
}
export interface StatisticsTranslation {
  back: string;
  playerName: string;
  totalGames: string;
  winsShort: string;
  wins: string;
  winsTotal: string,
  losesShort: string;
  loses: string;
  losesTotal: string;
  draws: string;
  normal: string;
  goat: string;
  officer: string;
  general: string;
  hunter: string;
  succHunt: string;
  hunted: string;
  clearPoints: string;
  totalPoints: string;
}
export interface LogTranslation {
  number: string;
  move: string;
  playTile: string;
  grabTile: string;
}
export interface RulesTranslation {
  instruction: string;
  save: string;
  default: string;
  maxGrabsInRow: string;
  minLeftInMarket: string;
  pointsToStartHunt: string;
  workGoat: string;
  totalPointsToLoseWithGoat: string;
  starterTiles: string;
  huntStarterTiles: string;
  add: string;
  remove: string;
  lastTilePoints: string;
  morePointToEndWith: string;
}
export interface StrategyCoeffsTranslation {
  createOpponent: string;
  opponentName: string;
  coefficients: string;
  create: string;
  cancel: string;
  randomnessCoef: string;
  myHandCoeff: string;
  opponentHandCoeff: string;
  opponentPossibleHandCoeff: string;
  leaveOfficerCoeff: string;
  dontKeepDoublesCoeff: string;
  getRidOfPointsCoeff: string;
  cutOpponentDoubleCoeff: string;
  playSafeCoeff: string;
  protectWeaknessCoeff: string;
  notBeatOwnEdgeCoeff: string;
}
