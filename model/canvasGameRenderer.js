var gameModel = require('./Constants');

class CanvasGameRenderer {
    constructor (canvas) {
        this.canvas = canvas
    }
    Setup () {
        this.context = this.canvas.getContext("2d")
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.gridWidth = gameModel.grid.width;
        this.gridHeight = gameModel.grid.height;
        this.clearWholeGameArea()
    }
    clearWholeGameArea() {
        this.context.fillStyle = "#ffffff"
        this.context.fillRect(0,0, this.canvas.width, this.canvas.height)
    }

    RenderGameState(gameState){
        this.clearWholeGameArea()

        function drawBlob(colour, gridPositionX, gridPositionY, needsBorder, borderColour) {
            this.context.fillStyle = colour
            let res = this.CalculatePositionWidthAndHeight(gridPositionX, gridPositionY, this.gridWidth, this.gridHeight, this.width, this.height);
            this.context.beginPath();

            this.context.arc(res.x, res.y, res.width * 0.47, 0, 2 * Math.PI);
            this.context.fill();
            if (needsBorder) {
                this.context.strokeStyle = borderColour;
                this.context.lineWidth = 2
                this.context.stroke();
            }
        }

        gameState.Blobs.forEach(
            blob => {
                let gridPositionX = blob.x;
                let gridPositionY = blob.y;
                let colourIndex = blob.colour;
                let needsBorder = blob.isPlayerControlled;
                let borderColour = "#303030";

                if (blob.oldy === undefined) {
                    drawBlob.call(this, gameState.colourMap[colourIndex], gridPositionX, gridPositionY, needsBorder, borderColour);
                } else {
                    drawBlob.call(this, gameState.colourMap[colourIndex], blob.oldx, blob.oldy, true, "#aaaaaa");
                }
            }
        )
    }

    CalculatePositionWidthAndHeight(gridPositionX, gridPositionY, gridWidth, gridHeight, canvasWidth, canvasHeight) {
        let squareSize = canvasWidth / gridWidth
        return {
            x: ((gridPositionX - 1) * (squareSize)) + squareSize/2,
            y: ((gridPositionY - 1) * (squareSize)) + squareSize/2,
            width: 50,
            height: 50
        }
    }
}

module.exports = { CanvasGameRenderer }