require('mocha')
const { expect } = require('chai')
var assert = require('assert');
var gameModel = require('../model/constants');

describe('game model', function() {

    it('should expose size of logical game area', function() {

        expect(gameModel.grid.width).to.equal(6)
        expect(gameModel.grid.height).to.equal(12)
    })
})
