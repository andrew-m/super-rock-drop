class Entity {
    constructor (x, y, colour = "#ff0000") {
        this.x = x
        this.y = y
        this.colour = colour
    }
}

module.exports = { Entity }

//todo Investigate the /instanceOf operator
// if (z instanceof Entity) {}