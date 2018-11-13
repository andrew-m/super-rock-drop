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
                this.context.fillRect(res.x, res.y, res.width, res.height)
            }
        )
    }

    CalculatePositionWidthAndHeight(gridPositionX, gridPositionY, gridWidth, gridHeight, canvasWidth, canvasHeight) {
        let squareSize = canvasWidth / gridWidth
        return {
            x: (gridPositionX - 1) * (squareSize),
            y: (gridPositionY - 1) * (squareSize),
            width: 50,
            height: 50
        }
    }
}

module.exports = { CanvasGameRenderer }