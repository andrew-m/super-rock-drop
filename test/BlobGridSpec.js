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
})
