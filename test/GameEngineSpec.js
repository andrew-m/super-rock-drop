require('mocha')
const { expect } = require('chai')
const assert = require('assert');
const gameEngine = require('../model/GameEngine.js');
let GameState = require('../model/GameState.js').GameState;
const Blob = require('../model/Blob.js').Blob;


describe('Game Engine On Clock Tick', function() {

    it('Should move blobs down', function() {

        let newBlobArray = [new Blob(1, 1)];
        let gameState = new GameState(newBlobArray)

        let newGameState = gameEngine.ProcessTickEvent(gameState)

        expect(newGameState.Blobs[0].x).to.equal(1)
        expect(newGameState.Blobs[0].y).to.equal(2)
    })
})
