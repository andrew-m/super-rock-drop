const input = {
    pressedKeys: {
        left: false,
        right: false,
        up: false,
        down: false,
    },
    discretePressedKeys: {
        zed: {
            pressed: false,
            ready: true
        },
        ex: {
            pressed: false,
            ready: true
        },
        colon: {
            pressed: false,
            ready: true
        },
        dot: {
            pressed: false,
            ready: true
        },
        space: {
            pressed: false,
            ready: true
        }
    }
}

var keyMap = {
    32: 'space',
    68: 'right',
    65: 'left',
    87: 'up',
    83: 'down',
    90: 'zed',
    88: 'ex',
    186: 'colon',
    190: 'dot'
}


function keydown (event) {
    var key = keyMap[event.keyCode];

    if (input.pressedKeys[key] !== undefined) {
        input.pressedKeys[key] = true;
    }
    if (input.discretePressedKeys[key] !== undefined) {
        if (input.discretePressedKeys[key].ready) {
            input.discretePressedKeys[key].pressed = true;
            input.discretePressedKeys[key].ready = false;
            setTimeout(function(){ input.discretePressedKeys[key].ready = true; }, 100);
            //commenting out the above line results in the discrete game piece
            //only moving once per keystroke, even if held down.
            //If left in, the line above controls the speed of movement if key is held down.
        }
    }
}

function keyup (event) {
    var key = keyMap[event.keyCode];
    if (input.discretePressedKeys[key] !== undefined) {
        input.discretePressedKeys[key].ready = true;
    }

    if (input.pressedKeys[key] !== undefined) {
        input.pressedKeys[key] = false;
    }
}

module.exports = {keydown, keyup, input}