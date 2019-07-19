require('mocha')
const {expect} = require('chai')
const assert = require('assert');
const gameStateQueries = require('../model/GameStateQueries.js');
let GameState = require('../model/GameState.js').GameState;
const Blob = require('../model/Blob.js').Blob;

describe('Detects non PC blobs below', function () {
    it('Should test is blob directly below', function () {
        let blob = new Blob(1, 11)
        let allBlobs = [blob, new Blob(1, 12)]

        let result = gameStateQueries.hasNonPCBlobDirectlyBelow(blob, allBlobs)
        expect(result).to.equal(true);
    })

    it('Should test is blob not directly below', function () {
        let blob = new Blob(1, 10)
        let allBlobs = [blob, new Blob(1, 12)]

        let result = gameStateQueries.hasNonPCBlobDirectlyBelow(blob, allBlobs)
        expect(result).to.equal(false);
    })

    it('Should test is blob not directly below', function () {
        let blob = new Blob(1, 11)
        let allBlobs = [blob, new Blob(2, 12)]

        let result = gameStateQueries.hasNonPCBlobDirectlyBelow(blob, allBlobs)
        expect(result).to.equal(false);
    })

    it('Should test is blob not PC blob', function () {
        let blob = new Blob(1, 11)
        let allBlobs = [blob, new Blob(1, 12, "#ffffff", true)]

        let result = gameStateQueries.hasNonPCBlobDirectlyBelow(blob, allBlobs)
        expect(result).to.equal(false);
    })
})
