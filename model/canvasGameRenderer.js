import { grid } from '../model/Constants.js';
class CanvasGameRenderer {
    constructor (canvas) {
        this.canvas = canvas
    }
    Setup () {
        this.context = this.canvas.getContext("2d")
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.gridWidth = grid.width;
        this.gridHeight = grid.height;
        this.clearWholeGameArea()
    }
    clearWholeGameArea() {
        this.context.fillStyle = "#ffffff"
        this.context.fillRect(0,0, this.canvas.width, this.canvas.height)
    }

    RenderGameState(gameState){
        this.clearWholeGameArea()

        function drawBlob(colour, gridPositionX, gridPositionY, needsBorder, borderColour, needsPopIndicator) {
            let res = this.CalculatePositionWidthAndHeight(gridPositionX, gridPositionY, this.gridWidth, this.gridHeight, this.width, this.height);

            drawACircle(this.context, res.x, res.y, res.width, colour, needsBorder);
            if (needsPopIndicator){
                drawACircle(this.context, res.x, res.y, res.width/2, "#ffffff", false);
            }

            function drawACircle(context, x, y, diameter,colour,  withBorder) {
                context.fillStyle = colour
                context.beginPath();

                context.arc(x, y, diameter * 0.47, 0, 2 * Math.PI);
                context.fill();
                if (withBorder) {
                    context.strokeStyle = borderColour;
                    context.lineWidth = 2
                    context.stroke();
                }
            }

            // if (true) {
            //     this.context.fillStyle = "#000000";
            //     this.context.arc(res.x, res.y, 5 * 0.47, 0, 2 * Math.PI);
            //     this.context.fill();
            // }
        }

        gameState.Blobs.forEach(
            blob => {
                let gridPositionX = blob.x;
                let gridPositionY = blob.y;
                let colourIndex = blob.colour;
                let needsBorder = blob.isPlayerControlled;
                let borderColour = "#404040";
                let needsPopIndicator = blob.needsPopping;

                if (blob.oldy === undefined) {
                    drawBlob.call(this, gameState.colourMap[colourIndex], gridPositionX, gridPositionY, needsBorder, borderColour, needsPopIndicator);
                } else { //is falling?
                    drawBlob.call(this, gameState.colourMap[colourIndex], blob.oldx, blob.oldy, needsBorder, borderColour, needsPopIndicator);
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

export { CanvasGameRenderer }