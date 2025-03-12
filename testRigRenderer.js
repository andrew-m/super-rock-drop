import {GameState, primeNextColour } from './model/GameState.js';
import { CanvasGameRenderer } from './model/CanvasGameRenderer.js';

import {keyLeft, keyRight, keyDown, keyRotate, animationComplete} from './model/GameEngine.js';
import {calculateAnimationPosition} from './model/AnimationEngine.js';

// let GameEngineController = require('./model/GameEngineController.js'); //fossil?
import {KeyboardInput, keyRegistration} from "./model/KeyboardInput.js";
import {Blob} from "./model/Blob.js";

/* 
Plan for this test Rig.
Unbind all the events, clock/time and keyboard.
Replace with some buttons.
Have a game state on the left, click an event (keypress, clock tick etc) 
to get a new game state - render that on the right.
Ideally some sort of inspection - ie render the gamestates as prettified json.

*/


let gameState
let canvasGameRendererLeft
let testTimestamp = 1000

const setup = function (doc) {
    if (doc === null || doc === undefined) {
        return;
    }

    canvasGameRendererLeft = new CanvasGameRenderer(doc.getElementById("canvasLeft"));
    doc.querySelector("#leftBtn").addEventListener("click", () => gameState = keyLeft(gameState));
    doc.querySelector("#rightBtn").addEventListener("click", () => gameState = keyRight(gameState));
    doc.querySelector("#rotateBtn").addEventListener("click", () => gameState = keyRotate(gameState));
    doc.querySelector("#downBtn").addEventListener("click", () => gameState = keyDown(gameState));
    doc.querySelector("#animateBtn").addEventListener("click", () => gameState =  AnimationLoop(testTimestamp, canvasGameRendererLeft, gameState));
    
    canvasGameRendererLeft.Setup();

    let newBlobArray = [
        // new Blob(1, 1, 1),
        // new Blob(1, 11, 1),
        // new Blob(6, 12, 2),
        // new Blob(3, 4, 1),
        // new Blob(3, 12, 3),
        // new Blob(3, 1, 0, true),
        // new Blob(4, 1, 1, true)
    ];

    gameState = new GameState(newBlobArray, true)
    gameState = primeNextColour(gameState)
    console.log("Primed^^^")
    console.log(JSON.stringify(gameState))
    canvasGameRendererLeft.RenderGameState(gameState)

    let keys = [
        new keyRegistration("KeyZ", () => gameState = keyLeft(gameState)),
        new keyRegistration("KeyX", () => gameState = keyRight(gameState)),
        new keyRegistration(
            "Period",
            () => gameState = keyDown(gameState),
            true,
            50
        ),
        new keyRegistration("Space", () => gameState = keyRotate(gameState))
    ]

    let ki = new KeyboardInput(keys);

    window.addEventListener("keydown", (e) => ki.keyDown(e), false);
    window.addEventListener("keyup", (e) => ki.keyUp(e), false);

    // loop();
}


let timeAtLastTick = 0

function AnimationLoop(timestamp, gameRenderer, gameState) {
    if (timestamp - timeAtLastTick > 1000) {
        timeAtLastTick = timestamp
        gameState = keyDown(gameState)
    }

    if (gameState.needsAnimation) {
        gameState = calculateAnimationPosition(gameState, animationComplete)
        gameState = primeNextColour(gameState) //this means we prime next colour on every animation frame when animation is needed, which seems unneeded! but without it at present colours stop rotating
    }

    gameRenderer.RenderGameState(gameState)

    return gameState
}

function loop (timestamp) {
    gameState = AnimationLoop(timestamp, canvasGameRendererLeft, gameState) //todo these should be arguments to the loop function, so it's stateless.
    window.requestAnimationFrame(loop)
}

function triggerLeft () {
    console.log("Try clicky clicky");
    alert("clicky clicky");
}

export {
    setup, triggerLeft as testClick
}