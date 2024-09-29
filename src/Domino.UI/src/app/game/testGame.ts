import { GameState } from "../_models/gameState";

export class TestGame {
    getGame(): GameState { return {
        id: 638614877478557700,
        message: "Default",
        set: {},
        table: {
          tilesOnTable: [
            {
              tile: {
                a: 0,
                b: 2,
                tileId: "02",
                isDouble: false
              },
              position: -9,
              contactEdge: 0
            },
            {
              tile: {
                a: 0,
                b: 0,
                tileId: "00",
                isDouble: true
              },
              position: -8,
              contactEdge: 0
            },
            {
              tile: {
                a: 0,
                b: 4,
                tileId: "04",
                isDouble: false
              },
              position: -7,
              contactEdge: 4
            },
            {
              tile: {
                a: 4,
                b: 4,
                tileId: "44",
                isDouble: true
              },
              position: -6,
              contactEdge: 4
            },
            {
              tile: {
                a: 4,
                b: 6,
                tileId: "46",
                isDouble: false
              },
              position: -5,
              contactEdge: 6
            },
            {
              tile: {
                a: 2,
                b: 6,
                tileId: "26",
                isDouble: false
              },
              position: -4,
              contactEdge: 2
            },
            {
              tile: {
                a: 1,
                b: 2,
                tileId: "12",
                isDouble: false
              },
              position: -3,
              contactEdge: 1
            },
            {
              tile: {
                a: 0,
                b: 1,
                tileId: "01",
                isDouble: false
              },
              position: -2,
              contactEdge: 0
            },
            {
              tile: {
                a: 0,
                b: 3,
                tileId: "03",
                isDouble: false
              },
              position: -1,
              contactEdge: 3
            },
            {
              tile: {
                a: 3,
                b: 3,
                tileId: "33",
                isDouble: true
              },
              position: 0,
              contactEdge: -1
            },
            {
              tile: {
                a: 1,
                b: 3,
                tileId: "13",
                isDouble: false
              },
              position: 1,
              contactEdge: 3
            },
            {
              tile: {
                a: 1,
                b: 6,
                tileId: "16",
                isDouble: false
              },
              position: 2,
              contactEdge: 1
            },
            {
              tile: {
                a: 0,
                b: 6,
                tileId: "06",
                isDouble: false
              },
              position: 3,
              contactEdge: 6
            },
            {
              tile: {
                a: 0,
                b: 5,
                tileId: "05",
                isDouble: false
              },
              position: 4,
              contactEdge: 0
            },
            {
              tile: {
                a: 5,
                b: 5,
                tileId: "55",
                isDouble: true
              },
              position: 5,
              contactEdge: 5
            },
            {
              tile: {
                a: 3,
                b: 5,
                tileId: "35",
                isDouble: false
              },
              position: 6,
              contactEdge: 5
            },
            {
              tile: {
                a: 3,
                b: 3,
                tileId: "33",
                isDouble: true
              },
              position: 7,
              contactEdge: 3
            },
            {
              tile: {
                a: 3,
                b: 6,
                tileId: "36",
                isDouble: false
              },
              position: 8,
              contactEdge: 3
            },
            // {
            //   tile: {
            //     a: 6,
            //     b: 6,
            //     tileId: "66",
            //     isDouble: true
            //   },
            //   position: 8,
            //   contactEdge: 6
            // },
            {
              tile: {
                a: 5,
                b: 6,
                tileId: "56",
                isDouble: false
              },
              position: 9,
              contactEdge: 6
            },
            {
              tile: {
                a: 2,
                b: 5,
                tileId: "25",
                isDouble: false
              },
              position: 10,
              contactEdge: 5
            },
            {
              tile: {
                a: 2,
                b: 2,
                tileId: "22",
                isDouble: true
              },
              position: 11,
              contactEdge: 2
            },
            {
              tile: {
                a: 2,
                b: 3,
                tileId: "23",
                isDouble: false
              },
              position: 12,
              contactEdge: 2
            },
          ]
        },
        player: {
          name: "Name",
          hand: [
            {
              a: 2,
              b: 4,
              tileId: "24",
              isDouble: false
            }
          ]
        },
        opponent: {
          name: "AI",
          hand: [
            {
              a: 1,
              b: 5,
              tileId: "15",
              isDouble: false
            },
            {
              a: 5,
              b: 6,
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
                a: 4,
                b: 4,
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
                a: 4,
                b: 6,
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
                a: 2,
                b: 6,
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
                a: 1,
                b: 2,
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
                a: 0,
                b: 1,
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
                a: 0,
                b: 3,
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
                a: 3,
                b: 3,
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
                a: 1,
                b: 3,
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
                a: 0,
                b: 4,
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
                a: 1,
                b: 6,
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
                a: 0,
                b: 6,
                tileId: "06",
                isDouble: false
              },
              nextToTile: {
                a: 1,
                b: 6,
                tileId: "16",
                isDouble: false
              }
            }
          ]
        }
      };
    }
}