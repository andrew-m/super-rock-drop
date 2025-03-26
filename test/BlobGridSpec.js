import 'mocha';
import {use, expect} from 'chai';

import chaiAlmost from 'chai-almost';
use(chaiAlmost());

import {Blob} from '../model/Blob.js';
import {BlobGrid} from '../model/BlobGrid.js';

describe('Blob grid Constructor and get Array', function () {

    it('Should return the same blob array its provided with', function () {
        let blob1 = new Blob(1, 10)
        let blob2 = new Blob(2, 10)
        
        var blobArray = [blob1,blob2];
        var grid = new BlobGrid(blobArray);
        
        var extracted = grid.GetOldArray();
        expect(extracted[0]).to.equal(blobArray[0]);
        expect(extracted[1]).to.equal(blobArray[1]);
    })

    it('Should return a 2d Array of OptionalBlobs with blobs in the right places, and not blobs in the wrong place', function () {
        let blob1 = new Blob(1, 10)
        let blob2 = new Blob(2, 5)
        
        var blobArray = [blob1,blob2];
        var grid = new BlobGrid(blobArray);
        
        
        // var extracted = grid.twoDArray; //the raw, zero indexed array // is an internal detail and we have no business reading it.
        //Lets have semantic access to blobs in places.

        let expectedBlob1 = grid.GetBlob(1,10);
        let expectedBlob2 = grid.GetBlob(2,5);
        let notExpectedBlob = grid.GetBlob(3,4);

        expect(expectedBlob1.hasBlob).to.equal(true);
        expect(expectedBlob2.hasBlob).to.equal(true);
        expect(notExpectedBlob.hasBlob).to.equal(false);

        expect(expectedBlob1.blob).to.equal(blobArray[0]);
        expect(expectedBlob2.blob).to.equal(blobArray[1]);
    })
})
