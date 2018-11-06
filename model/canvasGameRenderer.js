class CanvasGameRenderer {
    constructor (canvas) {
        this.canvas = canvas
    }
    Setup () {
        this.context = this.canvas.getContext("2d")
        this.clearWholeGameArea();
    }
    clearWholeGameArea() {
        this.context.fillRect(0,0, this.canvas.width, this.canvas.height)
    }
}

module.exports = { CanvasGameRenderer }