class GameState {
    constructor(blobs = [], needsAnimation = false) {
        this.Blobs = blobs
        this.needsAnimation = needsAnimation
    }
}

module.exports = {
    GameState
}