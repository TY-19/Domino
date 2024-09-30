import { GameState } from "../_models/gameState";

export class TestGame {
  static getGame(): GameState {
    return this.game3;
  }
  private static game1: GameState =
  {
    id: 638614877478557700,
    message: "Default",
    set: {},
    table: {
      tilesOnTable: [
        {
          tileDetails: {
            sideA: 0,
            sideB: 2,
            tileId: "02",
            isDouble: false
          },
          position: -9,
          contactEdge: 0
        },
        {
          tileDetails: {
            sideA: 0,
            sideB: 0,
            tileId: "00",
            isDouble: true
          },
          position: -8,
          contactEdge: 0
        },
        {
          tileDetails: {
            sideA: 0,
            sideB: 4,
            tileId: "04",
            isDouble: false
          },
          position: -7,
          contactEdge: 4
        },
        {
          tileDetails: {
            sideA: 4,
            sideB: 4,
            tileId: "44",
            isDouble: true
          },
          position: -6,
          contactEdge: 4
        },
        {
          tileDetails: {
            sideA: 4,
            sideB: 6,
            tileId: "46",
            isDouble: false
          },
          position: -5,
          contactEdge: 6
        },
        {
          tileDetails: {
            sideA: 2,
            sideB: 6,
            tileId: "26",
            isDouble: false
          },
          position: -4,
          contactEdge: 2
        },
        {
          tileDetails: {
            sideA: 1,
            sideB: 2,
            tileId: "12",
            isDouble: false
          },
          position: -3,
          contactEdge: 1
        },
        {
          tileDetails: {
            sideA: 0,
            sideB: 1,
            tileId: "01",
            isDouble: false
          },
          position: -2,
          contactEdge: 0
        },
        {
          tileDetails: {
            sideA: 0,
            sideB: 3,
            tileId: "03",
            isDouble: false
          },
          position: -1,
          contactEdge: 3
        },
        {
          tileDetails: {
            sideA: 3,
            sideB: 3,
            tileId: "33",
            isDouble: true
          },
          position: 0,
          contactEdge: -1
        },
        {
          tileDetails: {
            sideA: 1,
            sideB: 3,
            tileId: "13",
            isDouble: false
          },
          position: 1,
          contactEdge: 3
        },
        {
          tileDetails: {
            sideA: 1,
            sideB: 6,
            tileId: "16",
            isDouble: false
          },
          position: 2,
          contactEdge: 1
        },
        {
          tileDetails: {
            sideA: 0,
            sideB: 6,
            tileId: "06",
            isDouble: false
          },
          position: 3,
          contactEdge: 6
        },
        {
          tileDetails: {
            sideA: 0,
            sideB: 5,
            tileId: "05",
            isDouble: false
          },
          position: 4,
          contactEdge: 0
        },
        {
          tileDetails: {
            sideA: 5,
            sideB: 5,
            tileId: "55",
            isDouble: true
          },
          position: 5,
          contactEdge: 5
        },
        {
          tileDetails: {
            sideA: 3,
            sideB: 5,
            tileId: "35",
            isDouble: false
          },
          position: 6,
          contactEdge: 5
        },
        {
          tileDetails: {
            sideA: 3,
            sideB: 3,
            tileId: "33",
            isDouble: true
          },
          position: 7,
          contactEdge: 3
        },
        {
          tileDetails: {
            sideA: 3,
            sideB: 6,
            tileId: "36",
            isDouble: false
          },
          position: 8,
          contactEdge: 3
        },
        {
          tileDetails: {
            sideA: 6,
            sideB: 6,
            tileId: "66",
            isDouble: true
          },
          position: 9,
          contactEdge: 6
        },
        {
          tileDetails: {
            sideA: 5,
            sideB: 6,
            tileId: "56",
            isDouble: false
          },
          position: 10,
          contactEdge: 6
        },
        {
          tileDetails: {
            sideA: 2,
            sideB: 5,
            tileId: "25",
            isDouble: false
          },
          position: 11,
          contactEdge: 5
        },
        {
          tileDetails: {
            sideA: 2,
            sideB: 2,
            tileId: "22",
            isDouble: true
          },
          position: 12,
          contactEdge: 2
        },
        {
          tileDetails: {
            sideA: 2,
            sideB: 3,
            tileId: "23",
            isDouble: false
          },
          position: 13,
          contactEdge: 2
        },
      ]
    },
    player: {
      name: "Name",
      hand: [
        {
          sideA: 2,
          sideB: 4,
          tileId: "24",
          isDouble: false
        }
      ]
    },
    opponent: {
      name: "AI",
      hand: [
        {
          sideA: 1,
          sideB: 5,
          tileId: "15",
          isDouble: false
        },
        {
          sideA: 5,
          sideB: 6,
          tileId: "56",
          isDouble: false
        }
      ]
    },
    log: {
      events: [
        {
          moveNumber: 1,
          playerName: "Name",
          type: 1,
          tile: {
            sideA: 4,
            sideB: 4,
            tileId: "44",
            isDouble: true
          },
          nextToTile: null
        },
        {
          moveNumber: 2,
          playerName: "AI",
          type: 1,
          tile: {
            sideA: 4,
            sideB: 6,
            tileId: "46",
            isDouble: false
          },
          nextToTile: null
        },
        {
          moveNumber: 3,
          playerName: "Name",
          type: 1,
          tile: {
            sideA: 2,
            sideB: 6,
            tileId: "26",
            isDouble: false
          },
          nextToTile: null
        },
        {
          moveNumber: 4,
          playerName: "AI",
          type: 1,
          tile: {
            sideA: 1,
            sideB: 2,
            tileId: "12",
            isDouble: false
          },
          nextToTile: null
        },
        {
          moveNumber: 5,
          playerName: "Name",
          type: 1,
          tile: {
            sideA: 0,
            sideB: 1,
            tileId: "01",
            isDouble: false
          },
          nextToTile: null
        },
        {
          moveNumber: 6,
          playerName: "AI",
          type: 1,
          tile: {
            sideA: 0,
            sideB: 3,
            tileId: "03",
            isDouble: false
          },
          nextToTile: null
        },
        {
          moveNumber: 7,
          playerName: "Name",
          type: 1,
          tile: {
            sideA: 3,
            sideB: 3,
            tileId: "33",
            isDouble: true
          },
          nextToTile: null
        },
        {
          moveNumber: 8,
          playerName: "AI",
          type: 1,
          tile: {
            sideA: 1,
            sideB: 3,
            tileId: "13",
            isDouble: false
          },
          nextToTile: null
        },
        {
          moveNumber: 9,
          playerName: "Name",
          type: 1,
          tile: {
            sideA: 0,
            sideB: 4,
            tileId: "04",
            isDouble: false
          },
          nextToTile: null
        },
        {
          moveNumber: 10,
          playerName: "AI",
          type: 1,
          tile: {
            sideA: 1,
            sideB: 6,
            tileId: "16",
            isDouble: false
          },
          nextToTile: null
        },
        {
          moveNumber: 11,
          playerName: "Name",
          type: 1,
          tile: {
            sideA: 0,
            sideB: 6,
            tileId: "06",
            isDouble: false
          },
          nextToTile: {
            sideA: 1,
            sideB: 6,
            tileId: "16",
            isDouble: false
          }
        }
      ]
    }
  };
  private static game2: GameState =
  {
    id: 638614877478557700,
    message: "Default",
    set: {},
    table: {
      tilesOnTable: [
        {
          tileDetails: {
            sideA: 0,
            sideB: 3,
            tileId: "03",
            isDouble: false
          },
          position: -10,
          contactEdge: 0
        },
        {
          tileDetails: {
            sideA: 0,
            sideB: 0,
            tileId: "00",
            isDouble: true
          },
          position: -9,
          contactEdge: 0
        },
        {
          tileDetails: {
            sideA: 0,
            sideB: 5,
            tileId: "05",
            isDouble: false
          },
          position: -8,
          contactEdge: 5
        },
        {
          tileDetails: {
            sideA: 5,
            sideB: 5,
            tileId: "55",
            isDouble: true
          },
          position: -7,
          contactEdge: 5
        },
        {
          tileDetails: {
            sideA: 2,
            sideB: 5,
            tileId: "25",
            isDouble: false
          },
          position: -6,
          contactEdge: 2
        },
        {
          tileDetails: {
            sideA: 2,
            sideB: 6,
            tileId: "26",
            isDouble: false
          },
          position: -5,
          contactEdge: 6
        },
        {
          tileDetails: {
            sideA: 6,
            sideB: 6,
            tileId: "66",
            isDouble: true
          },
          position: -4,
          contactEdge: 6
        },
        {
          tileDetails: {
            sideA: 3,
            sideB: 6,
            tileId: "36",
            isDouble: false
          },
          position: -3,
          contactEdge: 3
        },
        {
          tileDetails: {
            sideA: 1,
            sideB: 3,
            tileId: "13",
            isDouble: false
          },
          position: -2,
          contactEdge: 1
        },
        {
          tileDetails: {
            sideA: 0,
            sideB: 1,
            tileId: "01",
            isDouble: false
          },
          position: -1,
          contactEdge: 0
        },
        {
          tileDetails: {
            sideA: 0,
            sideB: 6,
            tileId: "06",
            isDouble: false
          },
          position: 0,
          contactEdge: 0
        },
        {
          tileDetails: {
            sideA: 6,
            sideB: 5,
            tileId: "56",
            isDouble: false
          },
          position: 1,
          contactEdge: 6
        },
        {
          tileDetails: {
            sideA: 1,
            sideB: 5,
            tileId: "15",
            isDouble: false
          },
          position: 2,
          contactEdge: 5
        },
        {
          tileDetails: {
            sideA: 1,
            sideB: 4,
            tileId: "14",
            isDouble: false
          },
          position: 3,
          contactEdge: 1
        },
        {
          tileDetails: {
            sideA: 4,
            sideB: 4,
            tileId: "44",
            isDouble: true
          },
          position: 4,
          contactEdge: 4
        },
        {
          tileDetails: {
            sideA: 3,
            sideB: 4,
            tileId: "34",
            isDouble: false
          },
          position: 5,
          contactEdge: 4
        },
        {
          tileDetails: {
            sideA: 3,
            sideB: 3,
            tileId: "33",
            isDouble: true
          },
          position: 6,
          contactEdge: 3
        },
        {
          tileDetails: {
            sideA: 2,
            sideB: 3,
            tileId: "23",
            isDouble: false
          },
          position: 7,
          contactEdge: 3
        },
        {
          tileDetails: {
            sideA: 2,
            sideB: 2,
            tileId: "22",
            isDouble: true
          },
          position: 8,
          contactEdge: 2
        },
        {
          tileDetails: {
            sideA: 1,
            sideB: 2,
            tileId: "12",
            isDouble: false
          },
          position: 9,
          contactEdge: 2
        },
        {
          tileDetails: {
            sideA: 1,
            sideB: 1,
            tileId: "11",
            isDouble: true
          },
          position: 10,
          contactEdge: 1
        },
        {
          tileDetails: {
            sideA: 1,
            sideB: 6,
            tileId: "16",
            isDouble: false
          },
          position: 11,
          contactEdge: 1
        },
      ]
    },
    player: {
      name: "Name",
      hand: [
        {
          sideA: 3,
          sideB: 5,
          tileId: "35",
          isDouble: false
        }
      ]
    },
    opponent: {
      name: "AI",
      hand: [
        {
          sideA: 1,
          sideB: 5,
          tileId: "15",
          isDouble: false
        },
        {
          sideA: 5,
          sideB: 6,
          tileId: "56",
          isDouble: false
        }
      ]
    },
    log: {
      events: []
    }
  };
  private static game3: GameState =
  {
    id: 638614877478557700,
    message: "Default",
    set: {},
    table: {
      tilesOnTable: [
        {
          tileDetails: {
            sideA: 0,
            sideB: 3,
            tileId: "03",
            isDouble: false
          },
          position: 10,
          contactEdge: 0
        },
        {
          tileDetails: {
            sideA: 0,
            sideB: 0,
            tileId: "00",
            isDouble: true
          },
          position: 9,
          contactEdge: 0
        },
        {
          tileDetails: {
            sideA: 0,
            sideB: 5,
            tileId: "05",
            isDouble: false
          },
          position: 8,
          contactEdge: 5
        },
        {
          tileDetails: {
            sideA: 5,
            sideB: 5,
            tileId: "55",
            isDouble: true
          },
          position: 7,
          contactEdge: 5
        },
        {
          tileDetails: {
            sideA: 2,
            sideB: 5,
            tileId: "25",
            isDouble: false
          },
          position: 6,
          contactEdge: 2
        },
        {
          tileDetails: {
            sideA: 2,
            sideB: 6,
            tileId: "26",
            isDouble: false
          },
          position: 5,
          contactEdge: 6
        },
        
        {
          tileDetails: {
            sideA: 3,
            sideB: 6,
            tileId: "36",
            isDouble: false
          },
          position: 4,
          contactEdge: 3
        },
        {
          tileDetails: {
            sideA: 1,
            sideB: 3,
            tileId: "13",
            isDouble: false
          },
          position: 3,
          contactEdge: 1
        },
        {
          tileDetails: {
            sideA: 0,
            sideB: 1,
            tileId: "01",
            isDouble: false
          },
          position: 2,
          contactEdge: 0
        },
        {
          tileDetails: {
            sideA: 6,
            sideB: 6,
            tileId: "66",
            isDouble: true
          },
          position: 0,
          contactEdge: 6
        },
        {
          tileDetails: {
            sideA: 0,
            sideB: 6,
            tileId: "06",
            isDouble: false
          },
          position: 1,
          contactEdge: 0
        },
        {
          tileDetails: {
            sideA: 6,
            sideB: 5,
            tileId: "56",
            isDouble: false
          },
          position: -1,
          contactEdge: 6
        },
        {
          tileDetails: {
            sideA: 1,
            sideB: 5,
            tileId: "15",
            isDouble: false
          },
          position: -2,
          contactEdge: 5
        },
        {
          tileDetails: {
            sideA: 1,
            sideB: 4,
            tileId: "14",
            isDouble: false
          },
          position: -3,
          contactEdge: 1
        },
        {
          tileDetails: {
            sideA: 4,
            sideB: 4,
            tileId: "44",
            isDouble: true
          },
          position: -4,
          contactEdge: 4
        },
        {
          tileDetails: {
            sideA: 3,
            sideB: 4,
            tileId: "34",
            isDouble: false
          },
          position: -5,
          contactEdge: 4
        },
        {
          tileDetails: {
            sideA: 3,
            sideB: 3,
            tileId: "33",
            isDouble: true
          },
          position: -6,
          contactEdge: 3
        },
        {
          tileDetails: {
            sideA: 2,
            sideB: 3,
            tileId: "23",
            isDouble: false
          },
          position: -7,
          contactEdge: 3
        },
        {
          tileDetails: {
            sideA: 2,
            sideB: 2,
            tileId: "22",
            isDouble: true
          },
          position: -8,
          contactEdge: 2
        },
        {
          tileDetails: {
            sideA: 1,
            sideB: 2,
            tileId: "12",
            isDouble: false
          },
          position: -9,
          contactEdge: 2
        },
        {
          tileDetails: {
            sideA: 1,
            sideB: 1,
            tileId: "11",
            isDouble: true
          },
          position: -10,
          contactEdge: 1
        },
        {
          tileDetails: {
            sideA: 1,
            sideB: 6,
            tileId: "16",
            isDouble: false
          },
          position: -11,
          contactEdge: 1
        },
      ]
    },
    player: {
      name: "Name",
      hand: [
        {
          sideA: 3,
          sideB: 5,
          tileId: "35",
          isDouble: false
        }
      ]
    },
    opponent: {
      name: "AI",
      hand: [
        {
          sideA: 1,
          sideB: 5,
          tileId: "15",
          isDouble: false
        },
        {
          sideA: 5,
          sideB: 6,
          tileId: "56",
          isDouble: false
        }
      ]
    },
    log: {
      events: []
    }
  };
}
