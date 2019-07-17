require('mocha')
const {expect} = require('chai')
const assert = require('assert');
const gameEngine = require('../model/GameEngine.js');
let GameState = require('../model/GameState.js').GameState;
const Blob = require('../model/Blob.js').Blob;

//todo get rid of runFramesUntilNothingElseChanges function, (and the "moved" variable Game Engine returns for it.
//You'll need to refactor these tests to have multiple ticks.

describe('Game Engine On Clock Tick', function () {

    it('Should move all blobs down to the bottom', function () {

        let newBlobArray = [new Blob(1, 1), new Blob(3, 1)];
        let gameState = new GameState(newBlobArray)

        let newGameState = gameEngine.moveBlobsThatShouldFallToRestingPosition(gameState)

        expect(newGameState.Blobs[0].x).to.equal(1)
        expect(newGameState.Blobs[0].y).to.equal(12)

        expect(newGameState.Blobs[1].x).to.equal(3)
        expect(newGameState.Blobs[1].y).to.equal(12)
    })

    it('Should not move blobs down once they reach the bottom', () => {
        let newBlobArray = [new Blob(1, 11)];
        let gameState = new GameState(newBlobArray)

        let newGameState = gameEngine.moveBlobsThatShouldFallToRestingPosition(gameState)

        expect(newGameState.Blobs[0].x).to.equal(1)
        expect(newGameState.Blobs[0].y).to.equal(12)

        newGameState = gameEngine.moveBlobsThatShouldFallToRestingPosition(gameState)

        expect(newGameState.Blobs[0].x).to.equal(1)
        expect(newGameState.Blobs[0].y).to.equal(12)
    })

    it('Should not move blobs if there is a blob below them, which is not moving', () => {
        let newBlobArray = [new Blob(1, 9), new Blob(1, 11)];
        let gameState = new GameState(newBlobArray)

        let newGameState = gameEngine.moveBlobsThatShouldFallToRestingPosition(gameState)

        expect(newGameState.Blobs[0].x).to.equal(1)
        expect(newGameState.Blobs[0].y).to.equal(11)
        expect(newGameState.Blobs[1].x).to.equal(1)
        expect(newGameState.Blobs[1].y).to.equal(12)
    })

    it('Should not move player controlled entities', function () {
        let newBlobArray = [new Blob(1, 9, "#AAFFAA", true), new Blob(1, 11)];
        let gameState = new GameState(newBlobArray)

        let newGameState = gameEngine.moveBlobsThatShouldFallToRestingPosition(gameState)

        expect(newGameState.Blobs[0].x).to.equal(1)
        expect(newGameState.Blobs[0].y).to.equal(9)
        expect(newGameState.Blobs[1].x).to.equal(1)
        expect(newGameState.Blobs[1].y).to.equal(12)
    })
})

describe('The Game engines helper functions', function () {
    it('Should test is blob directly below', function () {
        let blob = new Blob(1, 11)
        let allBlobs = [blob, new Blob(1, 12)]

        let result = gameEngine.HasBlobDirectlyBelow(blob, 0, allBlobs)
        expect(result).to.equal(true);
    })

    it('Should test is blob not directly below', function () {
        let blob = new Blob(1, 10)
        let allBlobs = [blob, new Blob(1, 12)]

        let result = gameEngine.HasBlobDirectlyBelow(blob, 0, allBlobs)
        expect(result).to.equal(false);
    })

    it('Should test is blob not directly below', function () {
        let blob = new Blob(1, 11)
        let allBlobs = [blob, new Blob(2, 12)]

        let result = gameEngine.HasBlobDirectlyBelow(blob, 0, allBlobs)
        expect(result).to.equal(false);
    })
})


describe('On Keyboard Events', function () {
    it('Should move player controlled blobs left', function () {
        let newBlobArray = [new Blob(3, 3, "#AAFFAA", true), new Blob(3, 6)]
        let gameState = new GameState(newBlobArray)
        gameState = gameEngine.keyLeft(gameState)

        expect(gameState.Blobs[0].x).to.equal(2)
        expect(gameState.Blobs[0].isPlayerControlled).to.equal(true)
        expect(gameState.Blobs[1].x).to.equal(3)
    })

    it('Should move player controlled blobs right', function () {
        let newBlobArray = [new Blob(3, 3, "#AAFFAA", true), new Blob(3, 6)]
        let gameState = new GameState(newBlobArray)
        gameState = gameEngine.keyRight(gameState)

        expect(gameState.Blobs[0].x).to.equal(4)
        expect(gameState.Blobs[0].isPlayerControlled).to.equal(true)
        expect(gameState.Blobs[1].x).to.equal(3)
    })

    it('Should move player controlled blobs down', function () {
        let newBlobArray = [new Blob(3, 3, "#AAFFAA", true), new Blob(3, 6)]
        let gameState = new GameState(newBlobArray)
        gameState = gameEngine.keyDown(gameState)

        expect(gameState.Blobs[0].x).to.equal(3)
        expect(gameState.Blobs[0].y).to.equal(4)
        expect(gameState.Blobs[0].isPlayerControlled).to.equal(true)
        expect(gameState.Blobs[1].x).to.equal(3)
        expect(gameState.Blobs[1].y).to.equal(6)
    })

    it('Should not move blobs off the side left', function () {
        let newBlobArray = [new Blob(1, 9, "#AAFFAA", true), new Blob(2, 9, "#FFAAAA", true)];
        let gameState = new GameState(newBlobArray)

        let newGameState = gameEngine.keyLeft(gameState)

        expect(newGameState.Blobs[0].x).to.equal(1)
        expect(newGameState.Blobs[1].x).to.equal(2)
    })

    it('Should not move blobs off the right left', function () {
        let newBlobArray = [new Blob(5, 9, "#AAFFAA", true), new Blob(6, 9, "#FFAAAA", true)];
        let gameState = new GameState(newBlobArray)

        let newGameState = gameEngine.keyRight(gameState)

        expect(newGameState.Blobs[1].x).to.equal(6)
        expect(newGameState.Blobs[0].x).to.equal(5)
    })
})

describe('On rotate keyboard events', function () {
    it('Should rotate player controlled blobs from horizontal to vertical, down from the left hand blob', function () {
        let newBlobArray = [
            new Blob(3, 9, "#AAFFAA", true),
            new Blob(4, 9, "#FFAAAA", true)
        ];
        let gameState = new GameState(newBlobArray)

        let newGameState = gameEngine.keyRotate(gameState)

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

        let newGameState = gameEngine.keyRotate(gameState)

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

        let newGameState = gameEngine.keyRotate(gameState)

        expect(newGameState.Blobs[0].x).to.equal(6)
        expect(newGameState.Blobs[0].y).to.equal(8)
        expect(newGameState.Blobs[1].x).to.equal(5)
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

        let newGameState = gameEngine.keyDown(gameState) //you can go _to_ the bottom

        expect(newGameState.Blobs[0].x).to.equal(3)
        expect(newGameState.Blobs[0].y).to.equal(12)
        expect(newGameState.Blobs[0].isPlayerControlled).to.equal(true)
        expect(newGameState.Blobs[1].x).to.equal(4)
        expect(newGameState.Blobs[1].y).to.equal(12)
        expect(newGameState.Blobs[1].isPlayerControlled).to.equal(true)

        newGameState = gameEngine.keyDown(gameState) //you can't go _through_ the bottom
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

        let newGameState = gameEngine.keyDown(gameState) //you can go _to_ the bottom

        expect(newGameState.Blobs[0].x).to.equal(3)
        expect(newGameState.Blobs[0].y).to.equal(11)
        expect(newGameState.Blobs[0].isPlayerControlled).to.equal(true)
        expect(newGameState.Blobs[1].x).to.equal(3)
        expect(newGameState.Blobs[1].y).to.equal(12)
        expect(newGameState.Blobs[1].isPlayerControlled).to.equal(true)

        newGameState = gameEngine.keyDown(gameState) //you can't go _through_ the bottom
        expect(newGameState.Blobs[0].x).to.equal(3)
        expect(newGameState.Blobs[0].y).to.equal(11)
        expect(newGameState.Blobs[0].isPlayerControlled).to.equal(false)
        expect(newGameState.Blobs[1].x).to.equal(3)
        expect(newGameState.Blobs[1].y).to.equal(12)
        expect(newGameState.Blobs[1].isPlayerControlled).to.equal(false)
    })
})


describe('Where should I be blob intended position calculator', function () {
    it('Should left horizontal blob nowhere', function () {
        var blobLeft = new Blob(3, 8, "#AAFFAA", true);
        var blobRight = new Blob(4, 8, "#AAFFAA", true);

        let newPositionedBlob = gameEngine.whereShouldIBe(blobLeft, blobRight);

        expect(newPositionedBlob.x).to.equal(blobLeft.x)
        expect(newPositionedBlob.y).to.equal(blobLeft.y)
    })

    it('Should move right horizontal blob down and left', function () {
        var blobLeft = new Blob(3, 8, "#AAFFAA", true);
        var blobRight = new Blob(4, 8, "#AAFFAA", true);

        let newPositionedBlob = gameEngine.whereShouldIBe(blobRight, blobLeft);

        expect(newPositionedBlob.x).to.equal(blobLeft.x)
        expect(newPositionedBlob.y).to.equal(blobLeft.y + 1)
    })

    it('Should move top vertical blob right', function () {
        var blobTop = new Blob(3, 8, "#AAFFAA", true);
        var blobBottom = new Blob(3, 9, "#AAFFAA", true);

        let newPositionedBlob = gameEngine.whereShouldIBe(blobTop, blobBottom);

        expect(newPositionedBlob.x).to.equal(4)
        expect(newPositionedBlob.y).to.equal(8)
    })

    it('Should move bottom vertical blob up', function () {
        var blobTop = new Blob(3, 8, "#AAFFAA", true);
        var blobBottom = new Blob(3, 9, "#AAFFAA", true);

        let newPositionedBlob = gameEngine.whereShouldIBe(blobBottom, blobTop);

        expect(newPositionedBlob.x).to.equal(3)
        expect(newPositionedBlob.y).to.equal(8)
    })
})