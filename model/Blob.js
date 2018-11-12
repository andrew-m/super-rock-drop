class Blob {
    constructor (x, y, colour = "#ff0000") {
        this.x = x
        this.y = y
        this.colour = colour
    }
}

module.exports = { Blob }

//todo Investigate the /instanceOf operator
// if (z instanceof Blob) {}