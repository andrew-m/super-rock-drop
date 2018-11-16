let Blob = require ('./model/Blob.js').Blob;
let GameState = require('./model/GameState.js').GameState;
const CanvasGameRenderer = require('./model/canvasGameRenderer').CanvasGameRenderer;
let ProcessTickEvent = require('./model/GameEngine').ProcessTickEvent
let count = 1
let timeAtLastTick = 0
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
            new Blob(1, 1, '#ff0000'),
            new Blob(6, 12, '#00ff00'),
            new Blob(3, 5, '#ff00ff'),
            new Blob(3, 6, '#0000ff')]
    )
    canvasGameRenderer.RenderGameState(gameState)
    loop();
}

function loop (timestamp) {
    count += 1;
    document.getElementById("logContainer").textContent = "Count: ";// + count + " Timestamp: " + timestamp
    //todo put everything that happens here into a module
    //Keep time, and window objects out here,
    //keep every action _on_ time inside modules and testable.

    if (timestamp - timeAtLastTick > 1000) {
        gameState = ProcessTickEvent(gameState)
        canvasGameRenderer.RenderGameState(gameState)
    }

    window.requestAnimationFrame(loop)
}

module.exports = {
    setup
}