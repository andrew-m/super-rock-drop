var gameModel = require('../model/gameModel');


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

    RenderGameState(gameObjects){
        this.clearWholeGameArea()
        gameObjects.entities.forEach(
            entity => {
                this.context.fillStyle = entity.colour
                let res = this.CalculatePositionWidthAndHeight(entity.x, entity.y, this.gridWidth, this.gridHeight, this.width, this.height);
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