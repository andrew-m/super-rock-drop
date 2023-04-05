import 'mocha';
import {expect} from 'chai';

// const gameStateQueries = require('../model/GameStateQueries.js');
import {hasNonPCBlobDirectlyBelow,
    getOtherPlayerControlledBlob,
    hasNonPCBlobDirectlyRight,
    hasNonPCBlobDirectlyLeft} from '../model/GameStateQueries.js';

// let GameState = require('../model/GameState.js').GameState;
import {GameState} from '../model/GameState.js';
// const Blob = require('../model/Blob.js').Blob;
import {Blob} from '../model/Blob.js';

describe('Detects non PC blobs below', function () {
    it('Should test is blob directly below', function () {
        let blob = new Blob(1, 11)
        let allBlobs = [blob, new Blob(1, 12)]

        let result = hasNonPCBlobDirectlyBelow(blob, allBlobs)
        expect(result).to.equal(true);
    })

    it('Should test is blob not directly below', function () {
        let blob = new Blob(1, 10)
        let allBlobs = [blob, new Blob(1, 12)]

        let result = hasNonPCBlobDirectlyBelow(blob, allBlobs)
        expect(result).to.equal(false);
    })

    it('Should test is blob not directly below', function () {
        let blob = new Blob(1, 11)
        let allBlobs = [blob, new Blob(2, 12)]

        let result = hasNonPCBlobDirectlyBelow(blob, allBlobs)
        expect(result).to.equal(false);
    })

    it('Should test is blob not PC blob', function () {
        let blob = new Blob(1, 11)
        let allBlobs = [blob, new Blob(1, 12, "#ffffff", true)]

        let result = hasNonPCBlobDirectlyBelow(blob, allBlobs)
        expect(result).to.equal(false);
    })
})
