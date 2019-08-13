class GameState {
    constructor(blobs = [], needsAnimation = false) {
        this.Blobs = blobs
        this.needsAnimation = false
    }
}

module.exports = {
    GameState
}