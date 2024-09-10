import { DominoTilePosition } from "./dominoTilePosition"
import { LogEvent } from "./logEvent"
import { Player } from "./player"

export interface GameState {
    id: number,
    message: string,
    set: object,
    table: {
        tilesOnTable: DominoTilePosition[]
    },
    player: Player,
    opponent: Player,
    log: {
        events: LogEvent[]
    }
}