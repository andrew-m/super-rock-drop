require('mocha')
const { expect } = require('chai')
const assert = require('assert');
const gameEngine = require('../model/GameEngine.js');
let GameState = require('../model/GameState.js').GameState;
const Blob = require('../model/Blob.js').Blob;


describe('Game Engine On Clock Tick', function() {

    it('Should move all blobs down to the bottom', function() {

        let newBlobArray = [new Blob(1, 1), new Blob(3, 1)];
        let gameState = new GameState(newBlobArray)

        let newGameState = gameEngine.ProcessTickEvent(gameState)

        expect(newGameState.Blobs[0].x).to.equal(1)
        expect(newGameState.Blobs[0].y).to.equal(12)

        expect(newGameState.Blobs[1].x).to.equal(3)
        expect(newGameState.Blobs[1].y).to.equal(12)
    })

    it('Should not move blobs down once they reach the bottom',() => {
        let newBlobArray = [new Blob(1, 11)];
        let gameState = new GameState(newBlobArray)

        let newGameState = gameEngine.ProcessTickEvent(gameState)

        expect(newGameState.Blobs[0].x).to.equal(1)
        expect(newGameState.Blobs[0].y).to.equal(12)

        newGameState = gameEngine.ProcessTickEvent(gameState)

        expect(newGameState.Blobs[0].x).to.equal(1)
        expect(newGameState.Blobs[0].y).to.equal(12)
    })

    it('Should not move blobs if there is a blob below them, which is not moving', () => {
        let newBlobArray = [new Blob(1, 9), new Blob(1,11)];
        let gameState = new GameState(newBlobArray)

        let newGameState = gameEngine.ProcessTickEvent(gameState)

        expect(newGameState.Blobs[0].x).to.equal(1)
        expect(newGameState.Blobs[0].y).to.equal(11)
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
