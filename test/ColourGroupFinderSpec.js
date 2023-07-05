import 'mocha';
import {expect} from 'chai';
import {Blob} from '../model/Blob.js';
import {markForPopping} from '../model/ColourGroupFinder.js';

//so how should this work
describe('Same coloured blobs in groups of 4 should pop', function () {
    it('Should match blobs of the same colours', function () {
        let blobArray = [
            //x y is from a top left corner origin. 6, 12 is bottom right.
            new Blob(1, 12, 1),
            new Blob(2, 12, 1),
            new Blob(3, 12, 1),
            new Blob(4, 12, 1),
        ];
        let resultBlobs = markForPopping(blobArray)
        expect(resultBlobs[0].needsPopping).to.equal(true)
        expect(resultBlobs[1].needsPopping).to.equal(true)
        expect(resultBlobs[2].needsPopping).to.equal(true)
        expect(resultBlobs[3].needsPopping).to.equal(true)
    })

    it('Should not match blobs of different colours', function () {
        let blobArray = [
            //x y is from a top left corner origin. 6, 12 is bottom right.
            new Blob(1, 12, 1),
            new Blob(2, 12, 2),
            new Blob(3, 12, 3),
            new Blob(4, 12, 4),
        ];
        let resultBlobs = markForPopping(blobArray)
        expect(resultBlobs[0].needsPopping).to.equal(false)
        expect(resultBlobs[1].needsPopping).to.equal(false)
        expect(resultBlobs[2].needsPopping).to.equal(false)
        expect(resultBlobs[3].needsPopping).to.equal(false)
    })
});
