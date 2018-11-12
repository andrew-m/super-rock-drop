let Entity = require ('./model/Entity.js').Entity;
let GameState = require('./model/GameState.js').GameState;
const CanvasGameRenderer = require('./model/canvasGameRenderer').CanvasGameRenderer;
let count = 1
let time

const setup = function (doc) {
    if (doc === null || doc === undefined) {
        console.log("doc is null :(");
        return;
    }

    let canvasGameRenderer = new CanvasGameRenderer(doc.getElementById("canvas"));

    canvasGameRenderer.Setup();

    let gameState = new GameState([
            new Entity(1, 1, '#ff0000'),
            new Entity(6, 12, '#00ff00'),
            new Entity(3, 6, '#0000ff')]
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
    window.requestAnimationFrame(loop)
}

module.exports = {
    setup
}