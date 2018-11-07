// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const CanvasGameRenderer = require('./model/canvasGameRenderer').CanvasGameRenderer;


const setup = function (doc) {
    if (doc === null || doc === undefined) {
        console.log("doc is null :(");
        return;
    }

    let canvasGameRenderer = new CanvasGameRenderer(doc.getElementById("canvas"));

    canvasGameRenderer.Setup();
    canvasGameRenderer.JustDrawADamnRedSquare();
}

module.exports = {
    setup
}