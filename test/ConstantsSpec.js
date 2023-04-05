import 'mocha';
import {expect} from 'chai';
import {grid} from '../model/Constants.js';

describe('game model', function() {

    it('should expose size of logical game area', function() {

        expect(grid.width).to.equal(6)
        expect(grid.height).to.equal(12)
    })
})
