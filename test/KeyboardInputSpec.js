require('mocha')
const { expect } = require('chai')
var assert = require('assert');
var KeyboardInput = require('../model/KeyboardInput').KeyboardInput;
var keyRegistration = require('../model/KeyboardInput').keyRegistration;

describe('Keyboard', function() {
    it('should register a keypress, then invoke the right callback when called.', function() {
        let wasCalled = false
        let example = new keyRegistration("KeyZ", function () {
                wasCalled = true
            });
        let keyboardInput = new KeyboardInput([example]);

        keyboardInput.keyDown({code:"KeyZ"})
        expect(wasCalled).to.equal(true)
    })

    it('should deduplicate multiple keydown events until keyup pressed', function() {
        let wasCalled = false
        let example = new keyRegistration("KeyZ", function () {
                wasCalled = true
            });
        let keyboardInput = new KeyboardInput([example]);

        keyboardInput.keyDown({code:"KeyZ"})
        expect(wasCalled).to.equal(true)
        wasCalled = false; //reset

        keyboardInput.keyDown({code:"KeyZ"})
        expect(wasCalled).to.equal(false)

        keyboardInput.keyUp({code:"KeyZ"})
        keyboardInput.keyDown({code:"KeyZ"})
        expect(wasCalled).to.equal(true)
    })
})
