require('mocha')
const { expect } = require('chai')
var assert = require('assert');
var constants = require('../model/Constants');

describe('game model', function() {

    it('should expose size of logical game area', function() {

        expect(constants.grid.width).to.equal(6)
        expect(constants.grid.height).to.equal(12)
    })
})
