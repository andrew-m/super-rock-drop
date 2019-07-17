require('mocha')
const { expect } = require('chai')
var lolex = require("lolex");
var assert = require('assert');
var KeyboardInput = require('../model/KeyboardInput').KeyboardInput;
var keyRegistration = require('../model/KeyboardInput').keyRegistration;
var clock;

describe('Keyboard', function() {
    beforeEach(function () {
        clock = lolex.install();
        //Fake clock for testing methods that use settimeout
        //https://github.com/sinonjs/lolex
    });

    afterEach(function () {
        clock.uninstall();
    });

    it('should register a keypress, then invoke the right callback when called.', function() {
        let wasCalled = false
        let example = new keyRegistration("KeyZ", function () {
                wasCalled = true
            });
        let keyboardInput = new KeyboardInput([example]);

        keyboardInput.keyDown({code:"KeyZ"})
        expect(wasCalled).to.equal(true)
    })

    it('should deduplicate multiple keydown events until keyup pressed, even if time passes', function() {
        let wasCalled = false
        let example = new keyRegistration("KeyZ", function () {
                wasCalled = true
            });
        let keyboardInput = new KeyboardInput([example]);

        keyboardInput.keyDown({code:"KeyZ"})
        expect(wasCalled).to.equal(true)
        wasCalled = false; //reset

        clock.tick(100);
        keyboardInput.keyDown({code:"KeyZ"})
        expect(wasCalled).to.equal(false)

        keyboardInput.keyUp({code:"KeyZ"})
        keyboardInput.keyDown({code:"KeyZ"})
        expect(wasCalled).to.equal(true)
    })

    it('should not deduplicate continuously held key if continuous is true and delay has passed', function(){

        let wasCalled = false
        let delay = 100;

        let example = new keyRegistration("KeyZ", function () {
            wasCalled = true
        }, true, delay);
        let keyboardInput = new KeyboardInput([example]);

        keyboardInput.keyDown({code:"KeyZ"})
        expect(wasCalled).to.equal(true)
        wasCalled = false; //reset

        keyboardInput.keyDown({code:"KeyZ"})
        expect(wasCalled).to.equal(false)

        clock.tick(delay);
        keyboardInput.keyDown({code:"KeyZ"})
        expect(wasCalled).to.equal(true)

        keyboardInput.keyUp({code:"KeyZ"})
        keyboardInput.keyDown({code:"KeyZ"})
        expect(wasCalled).to.equal(true)
    })
})
