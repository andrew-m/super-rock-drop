let GameState = require('./model/GameState.js').GameState;
let primeNextColour = require('./model/GameState.js').primeNextColour;
const CanvasGameRenderer = require('./model/canvasGameRenderer').CanvasGameRenderer;
let GameEngine = require('./model/GameEngine');
let AnimationEngine = require('./model/AnimationEngine');

// let GameEngineController = require('./model/GameEngineController.js');
let KeyboardInput = require("./model/KeyboardInput.js").KeyboardInput
let keyRegistration = require("./model/KeyboardInput.js").keyRegistration
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
        new keyRegistration("KeyZ", () => gameState = GameEngine.keyLeft(gameState)),
        new keyRegistration("KeyX", () => gameState = GameEngine.keyRight(gameState)),
        new keyRegistration(
            "Period",
            () => gameState = GameEngine.keyDown(gameState),
            true,
            50
        ),
        new keyRegistration("Space", () => gameState = GameEngine.keyRotate(gameState))
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
        gameState = GameEngine.keyDown(gameState)
    }

    if (gameState.needsAnimation) {
        gameState = AnimationEngine.calculateAnimationPosition(gameState, GameEngine.animationComplete)
        gameState = primeNextColour(gameState)
    }

    gameRenderer.RenderGameState(gameState)

    return gameState
}

function loop (timestamp) {
    gameState = AnimationLoop(timestamp, canvasGameRenderer, gameState)
    window.requestAnimationFrame(loop)
}

module.exports = {
    setup
}