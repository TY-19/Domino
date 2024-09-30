import { DominoTile } from "./dominoTile"
import { LogEvent } from "./logEvent"
import { Player } from "./player"

export interface GameState {
    id: number,
    message: string,
    set: object,
    table: {
        tilesOnTable: DominoTile[]
    },
    player: Player,
    opponent: Player,
    log: {
        events: LogEvent[]
    }
}