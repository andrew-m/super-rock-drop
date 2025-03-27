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

        function drawBlob(colour, gridPositionX, gridPositionY, needsBorder, borderColour, needsPopIndicator, poppingGroup = "X") {
            let res = this.CalculatePositionWidthAndHeight(gridPositionX, gridPositionY, this.gridWidth, this.gridHeight, this.width, this.height);

            drawACircle(this.context, res.x, res.y, res.width, colour, needsBorder);
            if (needsPopIndicator){
                drawACircle(this.context, res.x, res.y, res.width/2, "#ffffff", false);
            }
            let verbose = true;
            if (verbose) {
                this.context.font = "14pt serif";
                this.context.fillStyle = "#777777";
                this.context.fillText(poppingGroup, res.x, res.y);
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
        }

        gameState.Blobs.forEach(
            blob => {
                let gridPositionX = blob.x;
                let gridPositionY = blob.y;
                let colourIndex = blob.colour;
                let needsBorder = blob.isPlayerControlled;
                let borderColour = "#404040";
                let needsPopIndicator = blob.needsPopping;
                let poppingGroup = blob.poppingGroup;

                if (blob.oldy === undefined) {
                    drawBlob.call(this, gameState.colourMap[colourIndex], gridPositionX, gridPositionY, needsBorder, borderColour, needsPopIndicator, poppingGroup);
                } else { //is falling?
                    drawBlob.call(this, gameState.colourMap[colourIndex], blob.oldx, blob.oldy, needsBorder, borderColour, needsPopIndicator, poppingGroup);
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