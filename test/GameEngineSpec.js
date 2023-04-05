import 'mocha';
import {expect} from 'chai';
import {spawnPlayerControlledBlobsIfNoPCBlobs,
    keyLeft,
    keyRight,
    keyDown,
    keyRotate,
    moveBlobsThatShouldFallToRestingPosition,
    whereShouldIBeOnRotate,
    pcBlobHasCrashedIntoOtherBlob,
    animationComplete} from '../model/GameEngine.js';

import {GameState, primeNextColour} from '../model/GameState.js';
// let primeNextColour = require('../model/GameState.js').primeNextColour;
import {Blob} from '../model/Blob.js';


describe('Game Engine On Clock Tick', function () {

    it('Should move all blobs down to the bottom', function () {

        let newBlobArray = [
            new Blob(1, 1),
            new Blob(3, 1)
        ];
        let gameState = new GameState(newBlobArray)

        let newGameState = moveBlobsThatShouldFallToRestingPosition(gameState)

        expect(newGameState.Blobs[0].x).to.equal(1)
        expect(newGameState.Blobs[0].y).to.equal(12)

        expect(newGameState.Blobs[1].x).to.equal(3)
        expect(newGameState.Blobs[1].y).to.equal(12)
    })

    it('Should not move blobs down once they reach the bottom', () => {
        let newBlobArray = [new Blob(1, 11)];
        let gameState = new GameState(newBlobArray)

        let newGameState = moveBlobsThatShouldFallToRestingPosition(gameState)

        expect(newGameState.Blobs[0].x).to.equal(1)
        expect(newGameState.Blobs[0].y).to.equal(12)

        newGameState = moveBlobsThatShouldFallToRestingPosition(gameState)

        expect(newGameState.Blobs[0].x).to.equal(1)
        expect(newGameState.Blobs[0].y).to.equal(12)
    })

    it('Should not move blobs if there is a blob below them, which is not moving', () => {
        let newBlobArray = [new Blob(1, 9), new Blob(1, 11)];
        let gameState = new GameState(newBlobArray)

        let newGameState = moveBlobsThatShouldFallToRestingPosition(gameState)

        expect(newGameState.Blobs[0].x).to.equal(1)
        expect(newGameState.Blobs[0].y).to.equal(11)
        expect(newGameState.Blobs[1].x).to.equal(1)
        expect(newGameState.Blobs[1].y).to.equal(12)
    })

    it('Should not move player controlled entities', function () {
        let newBlobArray = [new Blob(1, 9, "#AAFFAA", true), new Blob(1, 11)];
        let gameState = new GameState(newBlobArray)

        let newGameState = moveBlobsThatShouldFallToRestingPosition(gameState)

        expect(newGameState.Blobs[0].x).to.equal(1)
        expect(newGameState.Blobs[0].y).to.equal(9)
        expect(newGameState.Blobs[1].x).to.equal(1)
        expect(newGameState.Blobs[1].y).to.equal(12)
    })
})

describe('Recording old positions for animation', function(){
    it('When blobs fall, old position should be recorded', function () {
        let newBlobArray = [
            new Blob(1, 1),
            new Blob(3, 4)
        ];
        let gameState = new GameState(newBlobArray)

        let newGameState = moveBlobsThatShouldFallToRestingPosition(gameState)

        expect(newGameState.Blobs[0].x).to.equal(1)
        expect(newGameState.Blobs[0].y).to.equal(12)
        expect(newGameState.Blobs[0].oldx).to.equal(1)
        expect(newGameState.Blobs[0].oldy).to.equal(1)

        expect(newGameState.Blobs[1].x).to.equal(3)
        expect(newGameState.Blobs[1].y).to.equal(12)
        expect(newGameState.Blobs[1].oldx).to.equal(3)
        expect(newGameState.Blobs[1].oldy).to.equal(4)
    })

    it('Recorded position and requires animation should disappear on animation complete', function () {
        let newBlobArray = [
            new Blob(1, 1)
        ];
        let gameState = new GameState(newBlobArray)

        let newGameState = moveBlobsThatShouldFallToRestingPosition(gameState)

        expect(newGameState.Blobs.length).to.equal(1)
        expect(newGameState.Blobs[0].x).to.equal(1)
        expect(newGameState.Blobs[0].y).to.equal(12)
        expect(newGameState.Blobs[0].oldx).to.equal(1)
        expect(newGameState.Blobs[0].oldy).to.equal(1)
        expect(newGameState.needsAnimation).to.equal(true)

        newGameState = animationComplete(gameState)

        expect(newGameState.Blobs[0].x).to.equal(1)
        expect(newGameState.Blobs[0].y).to.equal(12)
        expect(newGameState.Blobs[0].oldx).to.equal(undefined)
        expect(newGameState.Blobs[0].oldy).to.equal(undefined)

        expect(newGameState.needsAnimation).to.equal(false)
    })

    it('New PC blobs should spawn on animation complete', function () {
        let newBlobArray = [
            new Blob(1, 1)
        ];
        let gameState = new GameState(newBlobArray)

        let newGameState = moveBlobsThatShouldFallToRestingPosition(gameState)

        expect(newGameState.Blobs[0].x).to.equal(1)
        expect(newGameState.Blobs[0].y).to.equal(12)
        expect(newGameState.Blobs[0].oldx).to.equal(1)
        expect(newGameState.Blobs[0].oldy).to.equal(1)

        newGameState = animationComplete(gameState)

        expect(newGameState.Blobs[0].x).to.equal(1)
        expect(newGameState.Blobs[0].y).to.equal(12)
        expect(newGameState.Blobs[0].oldx).to.equal(undefined)
        expect(newGameState.Blobs[0].oldy).to.equal(undefined)
        expect(newGameState.Blobs[1].isPlayerControlled).to.equal(true)
        expect(newGameState.Blobs[2].isPlayerControlled).to.equal(true)
    })

})

describe('On Move Keyboard Events', function () {
    it('Should move player controlled blobs left', function () {
        let newBlobArray = [
            new Blob(3, 3, "#AAFFAA", true),
            new Blob(3, 6)
        ]
        let gameState = new GameState(newBlobArray)
        gameState = keyLeft(gameState)

        expect(gameState.Blobs[0].x).to.equal(2)
        expect(gameState.Blobs[0].isPlayerControlled).to.equal(true)
        expect(gameState.Blobs[1].x).to.equal(3)
    })

    it('Should move player controlled blobs right', function () {
        let newBlobArray = [new Blob(3, 3, "#AAFFAA", true), new Blob(3, 6)]
        let gameState = new GameState(newBlobArray)
        gameState = keyRight(gameState)

        expect(gameState.Blobs[0].x).to.equal(4)
        expect(gameState.Blobs[0].isPlayerControlled).to.equal(true)
        expect(gameState.Blobs[1].x).to.equal(3)
    })

    it('Should move player controlled blobs down', function () {
        let newBlobArray = [
            new Blob(3, 3, "#AAFFAA", true),
            new Blob(3, 12)
        ]
        let gameState = new GameState(newBlobArray)
        gameState = keyDown(gameState)

        expect(gameState.Blobs[0].x).to.equal(3)
        expect(gameState.Blobs[0].y).to.equal(4)
        expect(gameState.Blobs[0].isPlayerControlled).to.equal(true)
        expect(gameState.Blobs[1].x).to.equal(3)
        expect(gameState.Blobs[1].y).to.equal(12)
    })
})

describe('On Move Keyboard Events Colliding with sides', function () {
    it('Should not move blobs off the side left', function () {
        let newBlobArray = [new Blob(1, 9, "#AAFFAA", true), new Blob(2, 9, "#FFAAAA", true)];
        let gameState = new GameState(newBlobArray)

        let newGameState = keyLeft(gameState)

        expect(newGameState.Blobs[0].x).to.equal(1)
        expect(newGameState.Blobs[1].x).to.equal(2)
    })

    it('Should not move blobs off the right side', function () {
        let newBlobArray = [new Blob(5, 9, "#AAFFAA", true), new Blob(6, 9, "#FFAAAA", true)];
        let gameState = new GameState(newBlobArray)

        let newGameState = keyRight(gameState)

        expect(newGameState.Blobs[1].x).to.equal(6)
        expect(newGameState.Blobs[0].x).to.equal(5)
    })
})

describe('On Move Keyboard Events Colliding with blobs sideways', function () {
    it('Should not move horizontal blobs left if collide with non PC blob', function () {
        let newBlobArray = [
            new Blob(1, 10, "#AAAAFF", false),
            new Blob(2, 10, "#AAFFAA", true),
            new Blob(3, 10, "#FFAAAA", true)
        ];

        let gameState = new GameState(newBlobArray)

        let newGameState = keyLeft(gameState)

        expect(newGameState.Blobs[1].x).to.equal(2) //non PC doesn't move
        expect(newGameState.Blobs[2].x).to.equal(3)
    })

    it('Should not move horizontal blobs right if collide with non PC blob', function () {
        let newBlobArray = [
            new Blob(4, 10, "#AAAAFF", false),
            new Blob(2, 10, "#AAFFAA", true),
            new Blob(3, 10, "#FFAAAA", true)
        ];

        let gameState = new GameState(newBlobArray)

        let newGameState = keyRight(gameState)

        expect(newGameState.Blobs[1].x).to.equal(2) //non PC doesn't move
        expect(newGameState.Blobs[2].x).to.equal(3)
    })
})

describe('On rotate keyboard events', function () {
    it('Should rotate player controlled blobs from horizontal to vertical, down from the left hand blob', function () {
        let newBlobArray = [
            new Blob(3, 9, "#AAFFAA", true),
            new Blob(4, 9, "#FFAAAA", true)
        ];
        let gameState = new GameState(newBlobArray)

        let newGameState = keyRotate(gameState)

        expect(newGameState.Blobs[0].x).to.equal(3)
        expect(newGameState.Blobs[0].y).to.equal(9)
        expect(newGameState.Blobs[1].x).to.equal(3)
        expect(newGameState.Blobs[1].y).to.equal(10)
    })

    it('Should rotate player controlled blobs that are vertical to horizontal, right of the top blob', function () {
        let newBlobArray = [
            new Blob(3, 8, "#AAFFAA", true),
            new Blob(3, 9, "#FFAAAA", true)
        ];
        let gameState = new GameState(newBlobArray)

        let newGameState = keyRotate(gameState)

        expect(newGameState.Blobs[0].x).to.equal(4)
        expect(newGameState.Blobs[0].y).to.equal(8)
        expect(newGameState.Blobs[1].x).to.equal(3)
        expect(newGameState.Blobs[1].y).to.equal(8)
    })

    it('Should rotate player controlled blobs that are vertical and on the right hand edge to horizontal, left of the top blob', function () {
        let newBlobArray = [
            new Blob(6, 8, "#AAFFAA", true),
            new Blob(6, 9, "#FFAAAA", true)
        ];
        let gameState = new GameState(newBlobArray)

        let newGameState = keyRotate(gameState)

        expect(newGameState.Blobs[0].x).to.equal(6)
        expect(newGameState.Blobs[0].y).to.equal(8)
        expect(newGameState.Blobs[1].x).to.equal(5)
        expect(newGameState.Blobs[1].y).to.equal(8)
    })

    it('Should rotate player controlled blobs that are vertical and would bump non-PC blobs to the right, left of the top blob', function () {
        let newBlobArray = [
            new Blob(5, 8, "#AAFFAA", true),
            new Blob(5, 9, "#FFAAAA", true),
            new Blob(6, 8, "#FFAAAA", false)
        ];
        let gameState = new GameState(newBlobArray)

        let newGameState = keyRotate(gameState)

        expect(newGameState.Blobs[0].x).to.equal(5)
        expect(newGameState.Blobs[0].y).to.equal(8)
        expect(newGameState.Blobs[1].x).to.equal(4)
        expect(newGameState.Blobs[1].y).to.equal(8)
    })
})

describe('When player controlled blobs crash', function () {
    it('Horizontal PC Blobs should crash and become non PC when they try to collide with the floor.', function () {
        let newBlobArray = [
            new Blob(3, 11, "#AAFFAA", true),
            new Blob(4, 11, "#FFAAAA", true)
        ];
        let gameState = new GameState(newBlobArray)

        let newGameState = keyDown(gameState) //you can go _to_ the bottom

        expect(newGameState.Blobs[0].x).to.equal(3)
        expect(newGameState.Blobs[0].y).to.equal(12)
        expect(newGameState.Blobs[0].isPlayerControlled).to.equal(true)
        expect(newGameState.Blobs[1].x).to.equal(4)
        expect(newGameState.Blobs[1].y).to.equal(12)
        expect(newGameState.Blobs[1].isPlayerControlled).to.equal(true)

        newGameState = keyDown(gameState) //you can't go _through_ the bottom
        expect(newGameState.Blobs[0].x).to.equal(3)
        expect(newGameState.Blobs[0].y).to.equal(12)
        expect(newGameState.Blobs[0].isPlayerControlled).to.equal(false)
        expect(newGameState.Blobs[1].x).to.equal(4)
        expect(newGameState.Blobs[1].y).to.equal(12)
        expect(newGameState.Blobs[1].isPlayerControlled).to.equal(false)
    })

    it('Vertical PC Blobs should crash and become non PC when they try to collide with the floor.', function () {
        let newBlobArray = [
            new Blob(3, 10, "#AAFFAA", true),
            new Blob(3, 11, "#FFAAAA", true)
        ];
        let gameState = new GameState(newBlobArray)

        let newGameState = keyDown(gameState) //you can go _to_ the bottom

        expect(newGameState.Blobs[0].x).to.equal(3)
        expect(newGameState.Blobs[0].y).to.equal(11)
        expect(newGameState.Blobs[0].isPlayerControlled).to.equal(true)
        expect(newGameState.Blobs[1].x).to.equal(3)
        expect(newGameState.Blobs[1].y).to.equal(12)
        expect(newGameState.Blobs[1].isPlayerControlled).to.equal(true)

        newGameState = keyDown(gameState) //you can't go _through_ the bottom
        expect(newGameState.Blobs[0].x).to.equal(3)
        expect(newGameState.Blobs[0].y).to.equal(11)
        expect(newGameState.Blobs[0].isPlayerControlled).to.equal(false)
        expect(newGameState.Blobs[1].x).to.equal(3)
        expect(newGameState.Blobs[1].y).to.equal(12)
        expect(newGameState.Blobs[1].isPlayerControlled).to.equal(false)
    })

    it('Vertical PC Blobs should crash and become non PC when they try to collide with non PC blobs below.', function () {
        let newBlobArray = [
            new Blob(3, 9, "#AAFFAA", true),
            new Blob(3, 10, "#FFAAAA", true),
            new Blob(3, 12, "#AAAAFF", false)
        ];

        let gameState = new GameState(newBlobArray)

        let newGameState = keyDown(gameState) //you can go _to_ the blob

        expect(newGameState.Blobs[0].x).to.equal(3)
        expect(newGameState.Blobs[0].y).to.equal(10)
        expect(newGameState.Blobs[0].isPlayerControlled).to.equal(true)
        expect(newGameState.Blobs[1].x).to.equal(3)
        expect(newGameState.Blobs[1].y).to.equal(11)
        expect(newGameState.Blobs[1].isPlayerControlled).to.equal(true)

        newGameState = keyDown(gameState) //you can't go _through_ the blob
        expect(newGameState.Blobs[0].x).to.equal(3)
        expect(newGameState.Blobs[0].y).to.equal(10)
        expect(newGameState.Blobs[0].isPlayerControlled).to.equal(false)
        expect(newGameState.Blobs[1].x).to.equal(3)
        expect(newGameState.Blobs[1].y).to.equal(11)
        expect(newGameState.Blobs[1].isPlayerControlled).to.equal(false)
    })
    it('Vertical PC Blobs should crash and become non PC when they try to collide with non PC blobs below.', function () {
        let newBlobArray = [
            new Blob(3, 10, "#AAFFAA", true),
            new Blob(3, 11, "#FFAAAA", true),
            new Blob(3, 12, "#AAAAFF", false)
        ];

        let gameState = new GameState(newBlobArray)

        let newGameState = keyDown(gameState) //crash

        expect(newGameState.needsAnimation).to.equal(true)
    })

    it('Horizontal PC Blobs should crash and become non PC when they try to collide with non PC blobs below. After which they will fall.', function () {
        let newBlobArray = [
            new Blob(3, 10, "#AAFFAA", true),
            new Blob(4, 10, "#FFAAAA", true),
            new Blob(3, 12, "#AAAAFF", false)
        ];

        let gameState = new GameState(newBlobArray)

        let newGameState = keyDown(gameState) //you can go _to_ the blob

        expect(newGameState.Blobs[0].x).to.equal(3)
        expect(newGameState.Blobs[0].y).to.equal(11)
        expect(newGameState.Blobs[0].isPlayerControlled).to.equal(true)
        expect(newGameState.Blobs[1].x).to.equal(4)
        expect(newGameState.Blobs[1].y).to.equal(11)
        expect(newGameState.Blobs[1].isPlayerControlled).to.equal(true)
        expect(newGameState.Blobs[2].x).to.equal(3)
        expect(newGameState.Blobs[2].y).to.equal(12)

        newGameState = keyDown(gameState) //you can't go _through_ the blob
        expect(newGameState.Blobs[0].x).to.equal(3)
        expect(newGameState.Blobs[0].y).to.equal(11)
        expect(newGameState.Blobs[0].isPlayerControlled).to.equal(false)
        expect(newGameState.Blobs[1].x).to.equal(4)
        expect(newGameState.Blobs[1].y).to.equal(12)
        expect(newGameState.Blobs[1].isPlayerControlled).to.equal(false)
    })
})

describe('On rotate crashes', function () {
    it('Should crash when blobs rotated onto non PC blobs from above and right', function () {
        let newBlobArray = [
            new Blob(3, 9, "#AAFFAA", true),
            new Blob(4, 9, "#FFAAAA", true),
            new Blob(3, 10, "#FFAAAA", false)
        ];
        let gameState = new GameState(newBlobArray)

        let newGameState = keyRotate(gameState)

        expect(newGameState.Blobs[0].x).to.equal(3)
        expect(newGameState.Blobs[0].y).to.equal(9)
        expect(newGameState.Blobs[0].isPlayerControlled).to.equal(false)
        expect(newGameState.Blobs[1].x).to.equal(4)
        expect(newGameState.Blobs[1].y).to.equal(9)
        expect(newGameState.Blobs[1].isPlayerControlled).to.equal(false)
    })
})

describe('Should detect crashed blobs', function () {
    it('Should return true if PC blob in same place as Non PC blob', function () {
        let newBlobArray = [
            new Blob(4, 9, "#AAFFAA", true),
            new Blob(4, 10, "#FFAAAA", true),
            new Blob(4, 10, "#FFAAAA", false)
        ]
        let isCrashed = pcBlobHasCrashedIntoOtherBlob(newBlobArray);
        expect(isCrashed).to.equal(true)
    })
    it('Should return false if PC blob in same place as itself', function () {
        let newBlobArray = [
            new Blob(4, 9, "#AAFFAA", true),
            new Blob(4, 10, "#FFAAAA", true),
        ]
        let isCrashed = pcBlobHasCrashedIntoOtherBlob(newBlobArray);
        expect(isCrashed).to.equal(false
        )
    })
})

describe('Spawn new player controlled blobs', function () {
    it('Should populate with PC blobs on demand at the middle of the top row', function () {
        let blobArray = [] //noblobs
        let gameState = new GameState(blobArray, false, ["#ff0000", "00FF00"])

        let newGameState = spawnPlayerControlledBlobsIfNoPCBlobs(gameState)
        let newBlobArray = newGameState.Blobs
        expect(newBlobArray.length).to.equal(2)

        expect(newBlobArray[0].x).to.equal(3)
        expect(newBlobArray[0].y).to.equal(1)
        expect(newBlobArray[0].isPlayerControlled).to.equal(true)
        expect(newBlobArray[1].x).to.equal(4)
        expect(newBlobArray[1].y).to.equal(1)
        expect(newBlobArray[1].isPlayerControlled).to.equal(true)
    })

    it('Should populate with PC blobs using next colours from gameState', function () {
        let blobArray = [] //noblobs
        let gameState = new GameState(blobArray, false, [0, 3])

        let newGameState = spawnPlayerControlledBlobsIfNoPCBlobs(gameState)

        expect(newGameState.Blobs.length).to.equal(2)

        expect(newGameState.Blobs[0].colour).to.equal(0)
        expect(newGameState.Blobs[1].colour).to.equal(3)
    })

    it('Should not populate with PC blobs if existing PC blobs', function () {
        let blobArray = [
            new Blob(4, 9, "#AAFFAA", true),
            new Blob(4, 10, "#FFAAAA", true)
        ]
        let gameState = new GameState(blobArray, false, ["#ff0000", "00FF00"])

        let newBlobArray = spawnPlayerControlledBlobsIfNoPCBlobs(gameState).Blobs

        expect(newBlobArray.length).to.equal(2)

        expect(newBlobArray[0].x).to.equal(4)
        expect(newBlobArray[0].y).to.equal(9)
        expect(newBlobArray[0].isPlayerControlled).to.equal(true)
        expect(newBlobArray[1].x).to.equal(4)
        expect(newBlobArray[1].y).to.equal(10)
        expect(newBlobArray[1].isPlayerControlled).to.equal(true)
    })
})

describe('Where should I be blob intended position calculator', function () {
    it('Should left horizontal blob nowhere', function () {
        var blobLeft = new Blob(3, 8, "#AAFFAA", true);
        var blobRight = new Blob(4, 8, "#AAFFAA", true);

        let newPositionedBlob = whereShouldIBeOnRotate(blobLeft, new GameState([blobLeft, blobRight]));

        expect(newPositionedBlob.x).to.equal(blobLeft.x)
        expect(newPositionedBlob.y).to.equal(blobLeft.y)
    })

    it('Should move right horizontal blob down and left', function () {
        var blobLeft = new Blob(3, 8, "#AAFFAA", true);
        var blobRight = new Blob(4, 8, "#AAFFAA", true);

        let newPositionedBlob = whereShouldIBeOnRotate(blobRight, new GameState([blobLeft, blobRight]));

        expect(newPositionedBlob.x).to.equal(blobLeft.x)
        expect(newPositionedBlob.y).to.equal(blobLeft.y + 1)
    })

    it('Should move top vertical blob right', function () {
        var blobTop = new Blob(3, 8, "#AAFFAA", true);
        var blobBottom = new Blob(3, 9, "#AAFFAA", true);

        let newPositionedBlob = whereShouldIBeOnRotate(blobTop, new GameState([blobTop, blobBottom]));

        expect(newPositionedBlob.x).to.equal(4)
        expect(newPositionedBlob.y).to.equal(8)
    })

    it('Should move bottom vertical blob up', function () {
        var blobTop = new Blob(3, 8, "#AAFFAA", true);
        var blobBottom = new Blob(3, 9, "#AAFFAA", true);

        let newPositionedBlob = whereShouldIBeOnRotate(blobBottom, new GameState([blobBottom, blobTop]));

        expect(newPositionedBlob.x).to.equal(3)
        expect(newPositionedBlob.y).to.equal(8)
    })
})

describe('blah', function () {
    it('GameStateShouldGenerateRandomColours', function () {
        let gameState = new GameState([], false, [])
        let newGameState = primeNextColour(gameState);
        expect(newGameState.nextColours[0] !== undefined).to.equal(true)
    })
})