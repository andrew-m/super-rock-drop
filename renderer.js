import {GameState, primeNextColour } from './model/GameState.js';
import { CanvasGameRenderer } from './model/CanvasGameRenderer.js';

import {keyLeft, keyRight, keyDown, keyRotate, animationComplete} from './model/GameEngine.js';
import {calculateAnimationPosition} from './model/AnimationEngine.js';

// let GameEngineController = require('./model/GameEngineController.js'); //fossil?
import {KeyboardInput, keyRegistration} from "./model/KeyboardInput.js";
import {Blob} from "./model/Blob.js";

let gameState
let canvasGameRenderer

const setup = function (doc) {
    if (doc === null || doc === undefined) {
        return;
    }

    canvasGameRenderer = new CanvasGameRenderer(doc.getElementById("canvas"));

    canvasGameRenderer.Setup();

let wibble = new Blob(1, 1, '#ff0000');

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
    canvasGameRenderer.RenderGameState(gameState)

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

    loop();
}


let timeAtLastTick = 0

function AnimationLoop(timestamp, gameRenderer, gameState) {
    if (timestamp - timeAtLastTick > 1000) {
        timeAtLastTick = timestamp
        gameState = keyDown(gameState)
    }

    if (gameState.needsAnimation) {
        gameState = calculateAnimationPosition(gameState, animationComplete)
        gameState = primeNextColour(gameState)
    }

    gameRenderer.RenderGameState(gameState)

    return gameState
}

function loop (timestamp) {
    gameState = AnimationLoop(timestamp, canvasGameRenderer, gameState)
    window.requestAnimationFrame(loop)
}

export {
    setup
}