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

    it('Should not match non contiguous blobs of same colours', function () {
        let blobArray = [
            //x y is from a top left corner origin. 6, 12 is bottom right.
            new Blob(1, 12, 1),
            new Blob(2, 12, 1),
            new Blob(4, 12, 1),
            new Blob(5, 12, 1),
        ];
        let resultBlobs = markForPopping(blobArray)
        expect(resultBlobs[0].needsPopping).to.equal(false)
        expect(resultBlobs[1].needsPopping).to.equal(false)
        expect(resultBlobs[2].needsPopping).to.equal(false)
        expect(resultBlobs[3].needsPopping).to.equal(false)
    })


    it('Should match contiguous blobs of same colours vertically', function () {
        let blobArray = [
            //x y is from a top left corner origin. 6, 12 is bottom right.
            new Blob(1, 9, 1),
            new Blob(1, 10, 1),
            new Blob(1, 11, 1),
            new Blob(1, 12, 1),
        ];
        let resultBlobs = markForPopping(blobArray)
        expect(resultBlobs[0].needsPopping).to.equal(true)
        expect(resultBlobs[1].needsPopping).to.equal(true)
        expect(resultBlobs[2].needsPopping).to.equal(true)
        expect(resultBlobs[3].needsPopping).to.equal(true)
    })

    it('Should match contiguous blobs of same colours vertically with diff colours to the left', function () {
        let blobArray = [
            //x y is from a top left corner origin. 6, 12 is bottom right.
            new Blob(1, 9, 2),
            new Blob(1, 10, 3),
            new Blob(1, 11, 4),
            new Blob(1, 12, 5),
            new Blob(2, 9, 1),
            new Blob(2, 10, 1),
            new Blob(2, 11, 1),
            new Blob(2, 12, 1),
        ];
        let resultBlobs = markForPopping(blobArray)
        expect(resultBlobs[0].needsPopping).to.equal(false)
        expect(resultBlobs[1].needsPopping).to.equal(false)
        expect(resultBlobs[2].needsPopping).to.equal(false)
        expect(resultBlobs[3].needsPopping).to.equal(false)
        expect(resultBlobs[4].needsPopping).to.equal(true)
        expect(resultBlobs[5].needsPopping).to.equal(true)
        expect(resultBlobs[6].needsPopping).to.equal(true)
        expect(resultBlobs[7].needsPopping).to.equal(true)
    })

    it('Should match l-shaped group of same colours along and up at the right', function () {
        //will this be the one that drives out a proper search?
        let blobArray = [
            //x y is from a top left corner origin. 6, 12 is bottom right.
            new Blob(1, 12, 1),
            new Blob(2, 12, 1),
            new Blob(3, 12, 1),
            new Blob(3, 11, 1),
        ]
        let resultBlobs = markForPopping(blobArray)
        console.log(JSON.stringify(resultBlobs));
        expect(resultBlobs[0].needsPopping).to.equal(true)
        expect(resultBlobs[1].needsPopping).to.equal(true)
        expect(resultBlobs[2].needsPopping).to.equal(true)
        expect(resultBlobs[3].needsPopping).to.equal(true)
    })
});
