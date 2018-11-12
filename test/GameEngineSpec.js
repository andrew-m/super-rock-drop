require('mocha')
const { expect } = require('chai')
const assert = require('assert');
const gameEngine = require('../model/GameEngine.js');
let GameState = require('../model/GameState.js').GameState;
const Entity = require('../model/Entity.js').Entity;


describe('Game Engine On Clock Tick', function() {

    it('Should move entities down', function() {

        let newEntityArray = [new Entity(1, 1)];
        let gameState = new GameState(newEntityArray)

        let newGameState = gameEngine.ProcessTickEvent(gameState)

        expect(newGameState.Entities[0].x).to.equal(1)
        expect(newGameState.Entities[0].y).to.equal(2)
    })
})
