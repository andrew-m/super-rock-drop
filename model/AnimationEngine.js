const GameState = require('../model/GameState.js').GameState;
const Blob = require('../model/Blob.js').Blob;

function calculateAnimationPosition(gameState, animationCompleteCallback) {
    let allAtNewPositionAlready = true
    let newGameState = new GameState(gameState.Blobs.map(b => {
        if (b.oldx !== undefined && b.oldy < b.y) {
            allAtNewPositionAlready = false
            //todo figure out why the test is failing
            //But also, I suspect the above if is a problem when it's floating point comparison.
            //wish there was a decimal type!
            return new Blob(b.x, b.y, b.colour, b.isPlayerControlled, b.requiresAnimation, b.oldx, b.oldy + 0.2)
        }
        return b;
    }));
    if (allAtNewPositionAlready){
        return animationCompleteCallback(gameState)
    }
    return newGameState
}

module.exports = {
    calculateAnimationPosition
}