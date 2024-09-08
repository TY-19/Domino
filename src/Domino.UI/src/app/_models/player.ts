import { DominoTile } from "./dominoTile"

export interface Player {
    name: string,
    hand: DominoTile[]
}
