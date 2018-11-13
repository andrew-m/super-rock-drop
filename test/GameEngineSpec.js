require('mocha')
const { expect } = require('chai')
const assert = require('assert');
const gameEngine = require('../model/GameEngine.js');
let GameState = require('../model/GameState.js').GameState;
const Blob = require('../model/Blob.js').Blob;


describe('Game Engine On Clock Tick', function() {

    it('Should move all blobs down', function() {

        let newBlobArray = [new Blob(1, 1), new Blob(3, 1)];
        let gameState = new GameState(newBlobArray)

        let newGameState = gameEngine.ProcessTickEvent(gameState)

        expect(newGameState.Blobs[0].x).to.equal(1)
        expect(newGameState.Blobs[0].y).to.equal(2)
        expect(newGameState.Blobs[1].x).to.equal(3)
        expect(newGameState.Blobs[1].y).to.equal(2)
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
})
