class Entity {
    constructor (x, y, colour) {
        this.x = x
        this.y = y
        this.colour = colour
    }
}

module.exports = { Entity }

//todo Investigate the /instanceOf operator
// if (z instanceof Entity) {}