require('mocha')
const {expect} = require('chai')

const chai = require('chai')

const chaiAlmost = require('chai-almost');
chai.use(chaiAlmost());
const assert = require('assert');
const animationEngine = require('../model/AnimationEngine.js');
let GameState = require('../model/GameState.js').GameState;
const Blob = require('../model/Blob.js').Blob;

describe('Game Engine On Clock Tick', function () {

    it('Should oldy by one fith of a square', function () {
        let newBlobArray = [
            new Blob(1, 12, "#ff0000", false, false, 1, 1)
        ];
        let gameState = new GameState(newBlobArray)

        let newGameState = animationEngine.calculateAnimationPosition(gameState)

        expect(newGameState.Blobs[0].x).to.equal(1)
        expect(newGameState.Blobs[0].y).to.equal(12)

        expect(newGameState.Blobs[0].oldx).to.equal(1)
        expect(newGameState.Blobs[0].oldy).to.equal(1.2)
    })


    it('Should stop changing oldy when reaches y', function () {
        let newBlobArray = [
            new Blob(1, 12, "#ff0000", false, false, 1, 11.8),
            new Blob(2, 12, "#ff0000", false, false, 2, 11.6)
        ];
        let gameState = new GameState(newBlobArray)

        let newGameState = animationEngine.calculateAnimationPosition(gameState, gameState => gameState)

        expect(newGameState.Blobs[0].oldy).to.equal(12)
        expect(newGameState.Blobs[1].oldy).to.almost.equal(11.8)

        newGameState = animationEngine.calculateAnimationPosition(newGameState, gameState => gameState)

        expect(newGameState.Blobs[0].oldy).to.equal(12)
        expect(newGameState.Blobs[1].oldy).to.almost.equal(12)
    })

    it('Should not call callback until all blobs arrived', function () {
        let newBlobArray = [
            new Blob(1, 12, "#ff0000", false, false, 1, 11.8),
            new Blob(2, 12, "#ff0000", false, false, 1, 11.6)
        ];

        let wasCalled = false
        function fakeAnimationComplete (gameState) {
            wasCalled = true
            return gameState
        }

        let gameState = new GameState(newBlobArray)

        let newGameState = animationEngine.calculateAnimationPosition(gameState)

        expect(newGameState.Blobs[0].oldy).to.equal(12)
        expect(newGameState.Blobs[1].oldy).to.almost.equal(11.8)
        expect(wasCalled).to.equal(false)
    })

    it('Should call provided callback when reached proper position', function () {
        let newBlobArray = [
            new Blob(1, 12, "#ff0000", false, false, 1, 12)
        ];
        let wasCalled = false

        function fakeAnimationComplete (gameState) {
            expect(gameState.Blobs[0].x).to.equal(1)
            expect(gameState.Blobs[0].y).to.equal(12)

            expect(gameState.Blobs[0].oldx).to.equal(1)
            expect(gameState.Blobs[0].oldy).to.equal(12)
            wasCalled = true
            return gameState
        }

        let gameState = new GameState(newBlobArray)

        let newGameState = animationEngine.calculateAnimationPosition(gameState, fakeAnimationComplete)
        expect(wasCalled).to.equal(true)
    })
})
