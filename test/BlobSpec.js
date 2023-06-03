import 'mocha';
import {use, expect} from 'chai';

import chaiAlmost from 'chai-almost';
use(chaiAlmost());

import {Blob} from '../model/Blob.js';

describe('Blob constructor', function () {

    it('When no animation needed, oldx and oldy should equal x and y', function () {
        let wibble = new Blob(1, 2, "#ff0000", false);
        console.log ('dinosau');
        expect(wibble.oldx).to.equal(wibble.x);
        expect(wibble.oldy).to.equal(wibble.y);
    })

    it('When animation needed, oldx and oldy should keep their values', function () {
        let wibble = new Blob(1, 2, "#ff0000", false, 2, 3);
        console.log ('dinosau');
        expect(wibble.oldx).to.equal(2);
        expect(wibble.oldy).to.equal(3);
    })
})
