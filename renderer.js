// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

function blah () {
    var canvas = doc.getElementById("canvas");
    width = canvas.width;
    height = canvas.height;
    sizeOfGridSquareX = width / gridWidth;
    sizeOfGridSquareY = height / gridHeight; //un hard code these.
    ctx = canvas.getContext("2d");
    console.log("Hellow");
}