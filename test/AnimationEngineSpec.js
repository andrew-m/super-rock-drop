import 'mocha';
import {use, expect} from 'chai';

import chaiAlmost from 'chai-almost';
use(chaiAlmost());

import {calculateAnimationPosition} from '../model/AnimationEngine.js';
import {GameState} from '../model/GameState.js';
import {Blob} from '../model/Blob.js';

describe('Game Engine On Clock Tick', function () {

    it('Should move oldy by one fith of a square', function () {
        let newBlobArray = [
            new Blob(1, 12, "#ff0000", false, 1, 1)
        ];
        let gameState = new GameState(newBlobArray)

        let newGameState = calculateAnimationPosition(gameState)

        expect(newGameState.Blobs[0].x).to.equal(1)
        expect(newGameState.Blobs[0].y).to.equal(12)

        expect(newGameState.Blobs[0].oldx).to.equal(1)
        expect(newGameState.Blobs[0].oldy).to.equal(1.2)
    })

    it('Should not remove needs animation flag when animation is not complete', function (){
        let newBlobArray = [
            new Blob(1, 12, "#ff0000", false, 1, 1)
        ];

        let gameState = new GameState(newBlobArray, true)
        let newGameState = calculateAnimationPosition(gameState, )

        expect(newGameState.needsAnimation).to.equal(true)
    })


    it('Should stop changing oldy when reaches y', function () {
        let newBlobArray = [
            new Blob(1, 12, "#ff0000", false, 1, 11.8),
            new Blob(2, 12, "#ff0000", false, 2, 11.6)
        ];
        let gameState = new GameState(newBlobArray)

        let newGameState = calculateAnimationPosition(gameState, gameState => gameState)

        expect(newGameState.Blobs[0].oldy).to.equal(12)
        expect(newGameState.Blobs[1].oldy).to.almost.equal(11.8)

        newGameState = calculateAnimationPosition(newGameState, gameState => gameState)

        expect(newGameState.Blobs[0].oldy).to.equal(12)
        expect(newGameState.Blobs[1].oldy).to.almost.equal(12)
    })

    it('Should not call callback until all blobs arrived', function () {
        let newBlobArray = [
            new Blob(1, 12, "#ff0000", false, 1, 11.8),
            new Blob(2, 12, "#ff0000", false, 1, 11.6)
        ];

        let wasCalled = false
        function fakeAnimationComplete (gameState) {
            wasCalled = true
            return gameState
        }

        let gameState = new GameState(newBlobArray, true)

        let newGameState = calculateAnimationPosition(gameState)

        expect(newGameState.Blobs[0].oldy).to.equal(12)
        expect(newGameState.Blobs[1].oldy).to.almost.equal(11.8)
        expect(wasCalled).to.equal(false)
        expect(newGameState.needsAnimation).to.equal(true)
    })

    it('Should call provided callback when reached proper position', function () {
        let newBlobArray = [
            new Blob(1, 12, "#ff0000", false, 1, 12)
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

        let newGameState = calculateAnimationPosition(gameState, fakeAnimationComplete)
        expect(wasCalled).to.equal(true)
    })
})
