class Blob {
    constructor (x, y, colour = "#222222", isPlayerControlled = false, oldx = undefined, oldy = undefined) {
        this.x = x
        this.y = y
        this.colour = colour
        if (colour === "#222222")
        {
            this.colour = "#444444"
            console.log("Default colour")
        }
        this.isPlayerControlled = isPlayerControlled
        this.oldx = oldx
        this.oldy = oldy
    }
}

module.exports = { Blob }