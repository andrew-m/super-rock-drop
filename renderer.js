let Entity = require ('./model/Entity.js').Entity;
const CanvasGameRenderer = require('./model/canvasGameRenderer').CanvasGameRenderer;


const setup = function (doc) {
    if (doc === null || doc === undefined) {
        console.log("doc is null :(");
        return;
    }

    let canvasGameRenderer = new CanvasGameRenderer(doc.getElementById("canvas"));

    canvasGameRenderer.Setup();

    let gameState = {
        entities: [new Entity(1, 1, '#ff0000'), new Entity(6, 12, '#00ff00'), new Entity(3, 6, '#0000ff')]
    }
    canvasGameRenderer.RenderGameState(gameState)
}

module.exports = {
    setup
}