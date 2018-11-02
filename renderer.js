// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const setup = function (doc) {
    if (doc === null || doc === undefined) {
        console.log("doc is null :(");
        return;
    }
    var canvas = doc.getElementById("canvas");
    width = canvas.width;
    height = canvas.height;
    sizeOfGridSquareX = width / 6;
    sizeOfGridSquareY = height / 12; //ToDo: un hard code these.
    ctx = canvas.getContext("2d");
    console.log("Hellow");

    ctx.fillStyle = "#ffffff";

    // var centerX = (entity.gameGridPosition.x * sizeOfGridSquareX) - (sizeOfGridSquareX / 2);
    // var centery = (entity.gameGridPosition.y * sizeOfGridSquareY) - (sizeOfGridSquareY / 2);

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle = "red";

    // var centerX = (entity.gameGridPosition.x * sizeOfGridSquareX) - (sizeOfGridSquareX / 2);
    // var centery = (entity.gameGridPosition.y * sizeOfGridSquareY) - (sizeOfGridSquareY / 2);

    ctx.fillRect(
        50,
        50,
        20,
        20
    );


}

module.exports = {
    setup
}