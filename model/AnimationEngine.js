// const GameState = require('../model/GameState.js').GameState;
import {GameState} from '../model/GameState.js';
// const Blob = require('../model/Blob.js').Blob;
import {Blob} from '../model/Blob.js';

function calculateAnimationPosition(gameState, animationCompleteCallback) {
    let allAtNewPositionAlready = true
    let newBlobsOldPositionsMoved = (gameState.Blobs.map(b => {
        if (b.oldx !== undefined && b.oldy < (b.y - 0.1)) {
            allAtNewPositionAlready = false
            return new Blob(b.x, b.y, b.colour, b.isPlayerControlled, b.oldx, b.oldy + 0.2)
        }
        return b;
    }));

    if (allAtNewPositionAlready){
        return animationCompleteCallback(gameState)
    }
    return new GameState(newBlobsOldPositionsMoved, true)
}

export {
    calculateAnimationPosition
}