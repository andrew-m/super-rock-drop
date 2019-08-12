class Blob {
    constructor (x, y, colour = "#ff0000", isPlayerControlled = false, requiresAnimation = false, oldx = undefined, oldy = undefined) {
        this.x = x
        this.y = y
        this.colour = colour
        this.isPlayerControlled = isPlayerControlled
        this.requiresAnimation = requiresAnimation
        this.oldx = oldx
        this.oldy = oldy
    }
}

module.exports = { Blob }