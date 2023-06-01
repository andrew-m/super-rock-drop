import {GameState, primeNextColour } from './model/GameState.js';

// let primeNextColour = require('./model/GameState.js').primeNextColour;
// const CanvasGameRenderer = require('./model/canvasGameRenderer').CanvasGameRenderer;
import { CanvasGameRenderer } from './model/CanvasGameRenderer.js';

// let GameEngine = require('./model/GameEngine');
import {keyLeft, keyRight, keyDown, keyRotate, animationComplete} from './model/GameEngine.js';
// let AnimationEngine = require('./model/AnimationEngine');
import {calculateAnimationPosition} from './model/AnimationEngine.js';

// let GameEngineController = require('./model/GameEngineController.js');
// let KeyboardInput = require("./model/KeyboardInput.js").KeyboardInput
import {KeyboardInput, keyRegistration} from "./model/KeyboardInput.js"
// let keyRegistration = require("./model/KeyboardInput.js").keyRegistration
let gameState
let canvasGameRenderer

const setup = function (doc) {
    if (doc === null || doc === undefined) {
        return;
    }

    canvasGameRenderer = new CanvasGameRenderer(doc.getElementById("canvas"));

    canvasGameRenderer.Setup();

    let newBlobArray = [
        // new Blob(1, 1, '#ff0000'),
        // new Blob(1, 11, '#ff0000'),
        // new Blob(6, 12, '#00ff00'),
        // new Blob(3, 4, '#ff00ff'),
        // new Blob(3, 12, '#0000ff'),
        // new Blob(3, 1, '#AAFFAA', true),
        // new Blob(4, 1, '#AAAAFF', true)
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