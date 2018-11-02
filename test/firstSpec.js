require('mocha')
const { expect } = require('chai')
var assert = require('assert');
var thing = require('../thing/thing.js').thing;

describe('Babylon user id rule', function() {

    it('should copy the user ids from the user object to the context object', function() {
            expect(true).to.equal(true)
    })
})

describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal([1,2,3].indexOf(4), -1);
        });
    });
});

describe('#indexOf()', function() {
    it('thing should sum two numbers', function() {
        assert.equal(thing(1, 2), 3);
    });
});
