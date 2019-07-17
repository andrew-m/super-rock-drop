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
        gameState.Blobs.forEach(
            blob => {
                this.context.fillStyle = blob.colour
                let res = this.CalculatePositionWidthAndHeight(blob.x, blob.y, this.gridWidth, this.gridHeight, this.width, this.height);

                this.context.beginPath();
                this.context.arc(res.x, res.y, res.width * 0.47, 0, 2 * Math.PI);
                this.context.fill();

                if (blob.isPlayerControlled) {
                    this.context.strokeStyle = "#303030";
                    this.context.lineWidth = 2
                    this.context.stroke();
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