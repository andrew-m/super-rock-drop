class Blob {
    constructor (x, y, colour = "#ff0000", isPlayerControlled = false) {
        this.x = x
        this.y = y
        this.colour = colour
        this.isPlayerControlled = isPlayerControlled
    }
}

module.exports = { Blob }

//todo Investigate the /instanceOf operator
// if (z instanceof Blob) {}