let Blob = require ('./model/Blob.js').Blob;
let GameState = require('./model/GameState.js').GameState;
const CanvasGameRenderer = require('./model/canvasGameRenderer').CanvasGameRenderer;
let GameEngine = require('./model/GameEngine');
let InputProvider = require("./model/InputProvider")
let gameState
let canvasGameRenderer

const setup = function (doc) {
    if (doc === null || doc === undefined) {
        console.log("doc is null :(");
        return;
    }

    canvasGameRenderer = new CanvasGameRenderer(doc.getElementById("canvas"));

    canvasGameRenderer.Setup();

    gameState = new GameState([
            new Blob(1, 4, '#ff0000'),
            new Blob(6, 12, '#00ff00'),
            new Blob(3, 5, '#ff00ff'),
            new Blob(3, 6, '#0000ff'),
            new Blob(3, 1, '#AAFFAA', true),
            new Blob(4, 1, '#AAAAFF', true)]
    )
    canvasGameRenderer.RenderGameState(gameState)

    window.addEventListener("keydown", InputProvider.keydown, false);
    window.addEventListener("keyup", InputProvider.keyup, false);

    loop();
}

function loop (timestamp) {
    gameState = GameEngine.AnimationLoop(timestamp, canvasGameRenderer, gameState, InputProvider.input)
    window.requestAnimationFrame(loop)
}

module.exports = {
    setup
}