require('mocha')
const { expect } = require('chai')
const assert = require('assert');
const gameEngine = require('../model/GameEngine.js');
let GameState = require('../model/GameState.js').GameState;
const Blob = require('../model/Blob.js').Blob;

//todo get rid of runFramesUntilNothingElseChanges function, (and the "moved" variable Game Engine returns for it.
//You'll need to refactor these tests to have multiple ticks.

describe('Game Engine On Clock Tick', function() {

    it('Should move all blobs down to the bottom', function() {

        let newBlobArray = [new Blob(1, 1), new Blob(3, 1)];
        let gameState = new GameState(newBlobArray)

        let newGameState = runFramesUntilNothingElseChanges(gameState)

        expect(newGameState.Blobs[0].x).to.equal(1)
        expect(newGameState.Blobs[0].y).to.equal(12)

        expect(newGameState.Blobs[1].x).to.equal(3)
        expect(newGameState.Blobs[1].y).to.equal(12)
    })

    it('Should not move blobs down once they reach the bottom',() => {
        let newBlobArray = [new Blob(1, 11)];
        let gameState = new GameState(newBlobArray)

        let newGameState = runFramesUntilNothingElseChanges(gameState)

        expect(newGameState.Blobs[0].x).to.equal(1)
        expect(newGameState.Blobs[0].y).to.equal(12)

        newGameState = runFramesUntilNothingElseChanges(gameState)

        expect(newGameState.Blobs[0].x).to.equal(1)
        expect(newGameState.Blobs[0].y).to.equal(12)
    })

    it('Should not move blobs if there is a blob below them, which is not moving', () => {
        let newBlobArray = [new Blob(1, 9), new Blob(1,11)];
        let gameState = new GameState(newBlobArray)

        let newGameState = runFramesUntilNothingElseChanges(gameState)

        expect(newGameState.Blobs[0].x).to.equal(1)
        expect(newGameState.Blobs[0].y).to.equal(11)
        expect(newGameState.Blobs[1].x).to.equal(1)
        expect(newGameState.Blobs[1].y).to.equal(12)
    })

    it('Should not move player controlled entities', function (){
        let newBlobArray = [new Blob(1, 9, "#AAFFAA", true), new Blob(1,11)];
        let gameState = new GameState(newBlobArray)

        let newGameState = runFramesUntilNothingElseChanges(gameState)

        expect(newGameState.Blobs[0].x).to.equal(1)
        expect(newGameState.Blobs[0].y).to.equal(9)
        expect(newGameState.Blobs[1].x).to.equal(1)
        expect(newGameState.Blobs[1].y).to.equal(12)
    })
})
describe ('The Game engines helper functions', function (){
    it ('Should test is blob directly below', function (){
        let blob = new Blob(1,11)
        let allBlobs = [blob, new Blob(1,12)]

        let result = gameEngine.HasBlobDirectlyBelow(blob, 0, allBlobs)
        expect(result).to.equal(true);
    })

    it ('Should test is blob not directly below', function (){
        let blob = new Blob(1,10)
        let allBlobs = [blob, new Blob(1,12)]

        let result = gameEngine.HasBlobDirectlyBelow(blob, 0, allBlobs)
        expect(result).to.equal(false);
    })

    it ('Should test is blob not directly below', function (){
        let blob = new Blob(1,11)
        let allBlobs = [blob, new Blob(2,12)]

        let result = gameEngine.HasBlobDirectlyBelow(blob, 0, allBlobs)
        expect(result).to.equal(false);
    })
})


describe('On Keyboard Events', function (){
    it('Should move plyer controlled blobs left', function (){
        let newBlobArray = [new Blob(3, 3, "#AAFFAA", true), new Blob(3,6)]
        let gameState = new GameState(newBlobArray)
        gameState = gameEngine.keyLeft(gameState)

        expect(gameState.Blobs[0].x).to.equal(2)
        expect(gameState.Blobs[0].isPlayerControlled).to.equal(true)
        expect(gameState.Blobs[1].x).to.equal(3)
    })

    it('Should move player controlled blobs right', function (){
        let newBlobArray = [new Blob(3, 3, "#AAFFAA", true), new Blob(3,6)]
        let gameState = new GameState(newBlobArray)
        gameState = gameEngine.keyRight(gameState)

        expect(gameState.Blobs[0].x).to.equal(4)
        expect(gameState.Blobs[0].isPlayerControlled).to.equal(true)
        expect(gameState.Blobs[1].x).to.equal(3)
    })

    it('Should move player controlled blobs down', function (){
        let newBlobArray = [new Blob(3, 3, "#AAFFAA", true), new Blob(3,6)]
        let gameState = new GameState(newBlobArray)
        gameState = gameEngine.keyDown(gameState)

        expect(gameState.Blobs[0].x).to.equal(3)
        expect(gameState.Blobs[0].y).to.equal(4)
        expect(gameState.Blobs[0].isPlayerControlled).to.equal(true)
        expect(gameState.Blobs[1].x).to.equal(3)
        expect(gameState.Blobs[1].y).to.equal(6)
    })
})

function runFramesUntilNothingElseChanges(gameState) {
    let result = gameEngine.ProcessAnimationFrame(gameState);
    if (result.moved) {
        return runFramesUntilNothingElseChanges(result.gameState)
    } else {
        return result.gameState
    }
}

