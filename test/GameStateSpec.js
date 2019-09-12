require('mocha')
const {expect} = require('chai')
const assert = require('assert');
const gameEngine = require('../model/GameEngine.js');
let GameState = require('../model/GameState.js').GameState;
let primeNextColour = require('../model/GameState.js').primeNextColour;
let GameStateColours = require('../model/GameState.js').colours;
const Blob = require('../model/Blob.js').Blob;

describe('GameState Copy functions', function () {
//todo Refactor to reduce dependence on constructor
    it('With Blobs should generate new GameState', function () {
        let newGameState = new GameState([], false, [])
    })
})

//todo Refactor to use index numbers of colours
//And pallete of colours to be settable
//And random number generation to be handled by the game state (seeded)