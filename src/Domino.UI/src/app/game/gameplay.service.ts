import { Injectable } from "@angular/core";
import { GameService } from "./game.service";
import { GameView } from "../_models/gameView";
import { LogEvent } from "../_models/logEvent";
import { TileDetails } from "../_models/tileDetails";
import { LanguageService } from "../_shared/language.service";
import { HintTranslation, OpponentPhrasesTranslation } from "../_shared/translations";

@Injectable({
    providedIn: 'root',
})

export class GameplayService {
  get opponentPhrases(): OpponentPhrasesTranslation | undefined {
    return this.languageService.translation?.opponentPhrases;
  }
  get hints(): HintTranslation | undefined {
    return this.languageService.translation?.hints;
  }
  constructor(private gameService: GameService,
    private languageService: LanguageService
  ) {

  }
  canGrab(game: GameView): [canGrab: boolean, reason: string] {
    if(this.hasTilesToPlay(game)) {
      return [false, this.hints?.noNeedToGrab ?? ""];
    } else if(game.player.grabInRow >= game.gameRules.maxGrabsInRow) {
      return [false, this.hints?.noMoreGrabsInRow ?? "" + game.player.grabInRow];
    } else if(game.marketTilesCount <= game.gameRules.minLeftInMarket) {
      return [false, this.hints?.noGrabsLastTiles.replace("{count}", game.gameRules.minLeftInMarket.toString()) ?? ""];
    } else {
      return [true, ""];
    }
  }
  checkForTurnEnd(game: GameView): boolean {
    return !this.hasTilesToPlay(game) && !this.canGrabAnotherTile(game);
  }
  moveSelectedTile(tileDetails: TileDetails, game: GameView): [play: boolean, isLeft: boolean] {
    if(game.table.leftFreeEnd !== null
      && game.table.rightFreeEnd !== null) {
      if(game.table.tilesOnTable.length === 1 && game.table.tilesOnTable[0].tileDetails.isDouble) {
        return [ true, false ];
      }
      let movesCount: number = 0;
      let isLeft: boolean | null = null;
      if(tileDetails.sideA === game.table.leftFreeEnd
        || tileDetails.sideB === game.table.leftFreeEnd) {
        movesCount++;
        isLeft = true;
      }
      if(tileDetails.sideA === game.table.rightFreeEnd
        || tileDetails.sideB === game.table.rightFreeEnd) {
        movesCount++;
        isLeft = false;
      }
      if(movesCount === 1 && isLeft !== null) {
        return [ true, isLeft ]
      } else
        return [false, false]
    } else {
      return [ true, true ]
    }
  }
  calculatePositionToPlay(tileDetails: TileDetails, contactEdge:
    number, placeLeft: boolean | undefined, game: GameView): number | null {
    let position: number | null = null!;
    if(contactEdge !== null && contactEdge !== tileDetails.sideA && contactEdge !== tileDetails.sideB) {
      console.error(`Cannot play tile to edge ${contactEdge}. Tile details:`);
      console.error(tileDetails);
    } else if(game.table.leftFreeEnd === null && game.table.rightFreeEnd === null) {
      position = 0;
    } else if(contactEdge === game.table.leftFreeEnd && contactEdge === game.table.rightFreeEnd) {
      position = placeLeft === null || placeLeft === true
        ? game.table.leftPosition! - 1
        : game.table.rightPosition! + 1;
    } else if(contactEdge === game.table.leftFreeEnd) {
      position = game.table.leftPosition! - 1;
    } else if(contactEdge === game.table.rightFreeEnd) {
      position = game.table.rightPosition! + 1;
    } else {
      console.error(`Cannot play tile to edge ${contactEdge}. Tile details:`);
      console.error(tileDetails);
    }
    return position;
  }
  buildOpponentMessage(events: LogEvent[], currentTurn: number, opponentName: string):
    [message: string, currentTurn: number] {
    let newEvents = events.filter(e => e.moveNumber > currentTurn &&
      e.playerName === opponentName).sort((a, b ) => {
        return a.moveNumber - b.moveNumber;
      });
    let startIndex = 0;
    for(let i = newEvents.length - 1; i >= 1; i--) {
      if(newEvents[i].moveNumber !== newEvents[i-1].moveNumber + 1) {
        startIndex = i - 1;
        break;
      }
    }
    newEvents = newEvents.slice(startIndex);
    let message = "";
    let turn = currentTurn;
    for(let event of newEvents) {
      if(event.type === 1) {
        message += this.opponentPhrases?.iPlayed + " " + event.tile.tileDetails.tileId + ".\n";
      } else if(event.type === 2) {
        message += this.opponentPhrases?.iGrabbed + "\n";
      }
      turn = event.moveNumber;
    }
    return [message, turn];
  }
  private hasTilesToPlay(game: GameView): boolean {
    return game.player.hand!.some(t =>
      t.sideA === game.table.leftFreeEnd
      || t.sideB === game.table.leftFreeEnd
      || t.sideA === game.table.rightFreeEnd
      || t.sideB === game.table.rightFreeEnd);
  }
  private canGrabAnotherTile(game: GameView): boolean {
    return game.player.grabInRow < game.gameRules.maxGrabsInRow
      && game.marketTilesCount > game.gameRules.minLeftInMarket;
  }
}