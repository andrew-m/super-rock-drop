class CanvasGameRenderer {
    constructor (canvas) {
        this.canvas = canvas
    }
    Setup () {
        this.context = this.canvas.getContext("2d")
        this.clearWholeGameArea();
    }
    clearWholeGameArea() {
        this.context.fillStyle = "#ffffff";
        this.context.fillRect(0,0, this.canvas.width, this.canvas.height)
    }

    JustDrawADamnRedSquare() {
        this.context.fillStyle = "red";

        this.context.fillRect(
            50,
            50,
            20,
            20
        );

    }
}

module.exports = { CanvasGameRenderer }