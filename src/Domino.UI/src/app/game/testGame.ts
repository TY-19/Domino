import { GameView } from "../_models/gameView";

export class TestGame {
  static getGame(): GameView {
    let gv: GameView = JSON.parse(this.gameJson);
    return gv;
  }
  static gameJson: string = `{
    "id": 638639939422189078,
    "table": {
        "tilesOnTable": [
            {
                "tileDetails": {
                    "sideA": 0,
                    "sideB": 4,
                    "tileId": "0-4",
                    "isDouble": false
                },
                "position": -9,
                "contactEdge": 4,
                "freeEnd": 0
            },
            {
                "tileDetails": {
                    "sideA": 4,
                    "sideB": 4,
                    "tileId": "4-4",
                    "isDouble": true
                },
                "position": -8,
                "contactEdge": 4,
                "freeEnd": 4
            },
            {
                "tileDetails": {
                    "sideA": 3,
                    "sideB": 4,
                    "tileId": "3-4",
                    "isDouble": false
                },
                "position": -7,
                "contactEdge": 3,
                "freeEnd": 4
            },
            {
                "tileDetails": {
                    "sideA": 3,
                    "sideB": 3,
                    "tileId": "3-3",
                    "isDouble": true
                },
                "position": -6,
                "contactEdge": 3,
                "freeEnd": 3
            },
            {
                "tileDetails": {
                    "sideA": 0,
                    "sideB": 3,
                    "tileId": "0-3",
                    "isDouble": false
                },
                "position": -5,
                "contactEdge": 0,
                "freeEnd": 3
            },
            {
                "tileDetails": {
                    "sideA": 0,
                    "sideB": 5,
                    "tileId": "0-5",
                    "isDouble": false
                },
                "position": -4,
                "contactEdge": 5,
                "freeEnd": 0
            },
            {
                "tileDetails": {
                    "sideA": 5,
                    "sideB": 6,
                    "tileId": "5-6",
                    "isDouble": false
                },
                "position": -3,
                "contactEdge": 6,
                "freeEnd": 5
            },
            {
                "tileDetails": {
                    "sideA": 4,
                    "sideB": 6,
                    "tileId": "4-6",
                    "isDouble": false
                },
                "position": -2,
                "contactEdge": 4,
                "freeEnd": 6
            },
            {
                "tileDetails": {
                    "sideA": 1,
                    "sideB": 4,
                    "tileId": "1-4",
                    "isDouble": false
                },
                "position": -1,
                "contactEdge": 1,
                "freeEnd": 4
            },
            {
                "tileDetails": {
                    "sideA": 1,
                    "sideB": 1,
                    "tileId": "1-1",
                    "isDouble": true
                },
                "position": 0,
                "contactEdge": -1,
                "freeEnd": 1
            },
            {
                "tileDetails": {
                    "sideA": 1,
                    "sideB": 6,
                    "tileId": "1-6",
                    "isDouble": false
                },
                "position": 1,
                "contactEdge": 1,
                "freeEnd": 6
            },
            {
                "tileDetails": {
                    "sideA": 0,
                    "sideB": 6,
                    "tileId": "0-6",
                    "isDouble": false
                },
                "position": 2,
                "contactEdge": 6,
                "freeEnd": 0
            },
            {
                "tileDetails": {
                    "sideA": 0,
                    "sideB": 2,
                    "tileId": "0-2",
                    "isDouble": false
                },
                "position": 3,
                "contactEdge": 0,
                "freeEnd": 2
            },
            {
                "tileDetails": {
                    "sideA": 2,
                    "sideB": 5,
                    "tileId": "2-5",
                    "isDouble": false
                },
                "position": 4,
                "contactEdge": 2,
                "freeEnd": 5
            },
            {
                "tileDetails": {
                    "sideA": 5,
                    "sideB": 5,
                    "tileId": "5-5",
                    "isDouble": true
                },
                "position": 5,
                "contactEdge": 5,
                "freeEnd": 5
            }
        ],
        "leftPosition": -9,
        "leftFreeEnd": 0,
        "rightPosition": 5,
        "rightFreeEnd": 5
    },
    "playerName": "Test",
    "playerHand": [
        {
            "sideA": 2,
            "sideB": 2,
            "tileId": "2-2",
            "isDouble": true
        },
        {
            "sideA": 2,
            "sideB": 3,
            "tileId": "2-3",
            "isDouble": false
        },
        {
            "sideA": 1,
            "sideB": 2,
            "tileId": "1-2",
            "isDouble": false
        },
        {
            "sideA": 2,
            "sideB": 6,
            "tileId": "2-6",
            "isDouble": false
        }
    ],
    "opponentName": "AI",
    "opponentTilesCount": 3,
    "marketTilesCount": 6,
    "gameStatus": {
        "gameType": "Normal",
        "status": "In progress",
        "isEnded": false,
        "isDraw": false,
        "result": null,
        "winner": null,
        "loser": null,
        "loserPointsCount": [
            {},
            {}
        ],
        "victoryType": null
    },
    "log": {
        "events": [
            {
                "moveNumber": 1,
                "playerName": "Test",
                "type": 1,
                "tile": {
                    "tileDetails": {
                        "sideA": 1,
                        "sideB": 1,
                        "tileId": "1-1",
                        "isDouble": true
                    },
                    "position": 0,
                    "contactEdge": -1,
                    "freeEnd": 1
                }
            },
            {
                "moveNumber": 2,
                "playerName": "AI",
                "type": 1,
                "tile": {
                    "tileDetails": {
                        "sideA": 1,
                        "sideB": 4,
                        "tileId": "1-4",
                        "isDouble": false
                    },
                    "position": -1,
                    "contactEdge": 1,
                    "freeEnd": 4
                }
            },
            {
                "moveNumber": 3,
                "playerName": "Test",
                "type": 1,
                "tile": {
                    "tileDetails": {
                        "sideA": 4,
                        "sideB": 6,
                        "tileId": "4-6",
                        "isDouble": false
                    },
                    "position": -2,
                    "contactEdge": 4,
                    "freeEnd": 6
                }
            },
            {
                "moveNumber": 4,
                "playerName": "AI",
                "type": 1,
                "tile": {
                    "tileDetails": {
                        "sideA": 5,
                        "sideB": 6,
                        "tileId": "5-6",
                        "isDouble": false
                    },
                    "position": -3,
                    "contactEdge": 6,
                    "freeEnd": 5
                }
            },
            {
                "moveNumber": 5,
                "playerName": "Test",
                "type": 1,
                "tile": {
                    "tileDetails": {
                        "sideA": 0,
                        "sideB": 5,
                        "tileId": "0-5",
                        "isDouble": false
                    },
                    "position": -4,
                    "contactEdge": 5,
                    "freeEnd": 0
                }
            },
            {
                "moveNumber": 6,
                "playerName": "AI",
                "type": 1,
                "tile": {
                    "tileDetails": {
                        "sideA": 0,
                        "sideB": 3,
                        "tileId": "0-3",
                        "isDouble": false
                    },
                    "position": -5,
                    "contactEdge": 0,
                    "freeEnd": 3
                }
            },
            {
                "moveNumber": 7,
                "playerName": "Test",
                "type": 1,
                "tile": {
                    "tileDetails": {
                        "sideA": 3,
                        "sideB": 3,
                        "tileId": "3-3",
                        "isDouble": true
                    },
                    "position": -6,
                    "contactEdge": 3,
                    "freeEnd": 3
                }
            },
            {
                "moveNumber": 8,
                "playerName": "AI",
                "type": 1,
                "tile": {
                    "tileDetails": {
                        "sideA": 3,
                        "sideB": 4,
                        "tileId": "3-4",
                        "isDouble": false
                    },
                    "position": -7,
                    "contactEdge": 3,
                    "freeEnd": 4
                }
            },
            {
                "moveNumber": 9,
                "playerName": "Test",
                "type": 2,
                "tile": null
            },
            {
                "moveNumber": 10,
                "playerName": "Test",
                "type": 2,
                "tile": null
            },
            {
                "moveNumber": 11,
                "playerName": "Test",
                "type": 1,
                "tile": {
                    "tileDetails": {
                        "sideA": 1,
                        "sideB": 6,
                        "tileId": "1-6",
                        "isDouble": false
                    },
                    "position": 1,
                    "contactEdge": 1,
                    "freeEnd": 6
                }
            },
            {
                "moveNumber": 12,
                "playerName": "AI",
                "type": 1,
                "tile": {
                    "tileDetails": {
                        "sideA": 4,
                        "sideB": 4,
                        "tileId": "4-4",
                        "isDouble": true
                    },
                    "position": -8,
                    "contactEdge": 4,
                    "freeEnd": 4
                }
            },
            {
                "moveNumber": 13,
                "playerName": "Test",
                "type": 1,
                "tile": {
                    "tileDetails": {
                        "sideA": 0,
                        "sideB": 6,
                        "tileId": "0-6",
                        "isDouble": false
                    },
                    "position": 2,
                    "contactEdge": 6,
                    "freeEnd": 0
                }
            },
            {
                "moveNumber": 14,
                "playerName": "AI",
                "type": 2,
                "tile": null
            },
            {
                "moveNumber": 15,
                "playerName": "AI",
                "type": 2,
                "tile": null
            },
            {
                "moveNumber": 16,
                "playerName": "AI",
                "type": 2,
                "tile": null
            },
            {
                "moveNumber": 17,
                "playerName": "Test",
                "type": 1,
                "tile": {
                    "tileDetails": {
                        "sideA": 0,
                        "sideB": 2,
                        "tileId": "0-2",
                        "isDouble": false
                    },
                    "position": 3,
                    "contactEdge": 0,
                    "freeEnd": 2
                }
            },
            {
                "moveNumber": 18,
                "playerName": "AI",
                "type": 1,
                "tile": {
                    "tileDetails": {
                        "sideA": 2,
                        "sideB": 5,
                        "tileId": "2-5",
                        "isDouble": false
                    },
                    "position": 4,
                    "contactEdge": 2,
                    "freeEnd": 5
                }
            },
            {
                "moveNumber": 19,
                "playerName": "Test",
                "type": 2,
                "tile": null
            },
            {
                "moveNumber": 20,
                "playerName": "Test",
                "type": 2,
                "tile": null
            },
            {
                "moveNumber": 21,
                "playerName": "Test",
                "type": 2,
                "tile": null
            },
            {
                "moveNumber": 22,
                "playerName": "Test",
                "type": 1,
                "tile": {
                    "tileDetails": {
                        "sideA": 0,
                        "sideB": 4,
                        "tileId": "0-4",
                        "isDouble": false
                    },
                    "position": -9,
                    "contactEdge": 4,
                    "freeEnd": 0
                }
            },
            {
                "moveNumber": 23,
                "playerName": "AI",
                "type": 1,
                "tile": {
                    "tileDetails": {
                        "sideA": 5,
                        "sideB": 5,
                        "tileId": "5-5",
                        "isDouble": true
                    },
                    "position": 5,
                    "contactEdge": 5,
                    "freeEnd": 5
                }
            }
        ]
    },
    "possibleTilesToPlay": []
}`;
}
