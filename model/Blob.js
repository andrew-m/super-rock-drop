class Blob {
    constructor (x, y, colour = 1, isPlayerControlled = false, oldx = undefined, oldy = undefined) {
        this.x = x
        this.y = y
        this.colour = colour
        this.isPlayerControlled = isPlayerControlled
        this.oldx = oldx
        this.oldy = oldy
    }
}

export { Blob }