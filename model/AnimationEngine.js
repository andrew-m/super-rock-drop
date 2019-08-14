const GameState = require('../model/GameState.js').GameState;
const Blob = require('../model/Blob.js').Blob;

function calculateAnimationPosition(gameState, animationCompleteCallback) {
    let allAtNewPositionAlready = true
    let newBlobsOldPositionsMoved = (gameState.Blobs.map(b => {
        if (b.oldx !== undefined && b.oldy < (b.y - 0.1)) {
            allAtNewPositionAlready = false
            return new Blob(b.x, b.y, b.colour, b.isPlayerControlled, b.requiresAnimation, b.oldx, b.oldy + 0.2)
        }
        return b;
    }));

    if (allAtNewPositionAlready){
        return animationCompleteCallback(gameState)
    }
    return new GameState(newBlobsOldPositionsMoved, true)
}

module.exports = {
    calculateAnimationPosition
}