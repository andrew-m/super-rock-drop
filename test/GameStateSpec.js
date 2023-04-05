import 'mocha';
import {expect} from 'chai';
import {
    spawnPlayerControlledBlobsIfNoPCBlobs,
    keyLeft,
    keyRight,
    keyDown,
    keyRotate,
    moveBlobsThatShouldFallToRestingPosition,
    whereShouldIBeOnRotate,
    pcBlobHasCrashedIntoOtherBlob,
    animationComplete
} from '../model/GameEngine.js';

import {GameState, primeNextColour} from '../model/GameState.js';
let GameStateColours = GameState.colours;
import {Blob} from '../model/Blob.js';


describe('GameState Copy functions', function () {
//todo Refactor to reduce dependence on constructor
    it('With Blobs should generate new GameState', function () {
        let newGameState = new GameState([], false, [])
    })
})

//todo Refactor to use index numbers of colours
//And pallete of colours to be settable
//And random number generation to be handled by the game state (seeded)