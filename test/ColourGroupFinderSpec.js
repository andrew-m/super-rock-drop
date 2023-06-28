import 'mocha';
import {expect} from 'chai';
import {Blob} from '../model/Blob.js';
import {markForPopping} from '../model/ColourGroupFinder.js';

//so how should this work
describe('Should mark touching, same coloured blobs', function () {
    it('Something', function () {
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
});
