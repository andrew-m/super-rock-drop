
const GameState = require('../model/GameState.js').GameState;

const Blob = require('../model/Blob.js').Blob;
const hasNonPCBlobDirectlyBelow = require('../model/GameStateQueries.js').hasNonPCBlobDirectlyBelow;
const getOtherPlayerControlledBlob = require('../model/GameStateQueries.js').getOtherPlayerControlledBlob;
const hasNonPCBlobDirectlyRight = require('../model/GameStateQueries.js').hasNonPCBlobDirectlyRight;
const hasNonPCBlobDirectlyLeft = require('../model/GameStateQueries.js').hasNonPCBlobDirectlyLeft;

function spawnPlayerControlledBlobs(gameState) {
    //Immutable equivalent of array.push
    gameState.Blobs = [...gameState.Blobs,
        new Blob(3, 1, "#ff0000", true),
        new Blob(4, 1, "#00ff00", true)
    ];
    return gameState;
}

function keyLeft(gameState) {
    return ifPlayerControlled(moveLeftIfNotAtEdge, gameState)
}
function keyRight(gameState) {
    return ifPlayerControlled(moveRightIfNotAtEdge, gameState);
}
function keyDown(gameState) {
    let newGameState = ifPlayerControlled(moveDown_OrCrashIfAtBottom_orOtherPCBlobShouldCrash, gameState);
    if (! newGameState.Blobs.some(b => b.isPlayerControlled === true)) {
        newGameState = spawnPlayerControlledBlobs(gameState)
    }
    return newGameState;
}
function keyUp(gameState) {
    return ifPlayerControlled(moveUp, gameState);
}

function keyRotate(gameState) {
    //assume only two player controlled blobs

    //should I move? #
    //Am I to the right? Move down and left. DONE
    //Am I above? Move right.
    //Am I below? Move up.
    //Am I left? Stay put. DONE

    //But...Will I move off the right hand edge?
        //Am I above (and on right hand edge)?
        //Stay put.
        //Am I below and on right hand edge?
        //Move up and left.

    const oldBlobsArray = gameState.Blobs;
    var newBlobsArray = oldBlobsArray.map(
        (blob) => {
            if (blob.isPlayerControlled) {
                return whereShouldIBeOnRotate(blob, getOtherPlayerControlledBlob(blob, oldBlobsArray), oldBlobsArray)
            } else {
                return blob;
            }
        }
    )
    return new GameState(newBlobsArray)
}

function whereShouldIBeOnRotate(blob, otherBlob, blobArray) {
    let horizontal = blob.y === otherBlob.y;

    let toTheLeft = blob.x < otherBlob.x;
    if (horizontal) {
        if (toTheLeft) {
            return blob;
        } else {
            //to the right - move down and left.
            return new Blob(blob.x -1, blob.y +1, blob.colour, blob.isPlayerControlled)
        }
    } else { //vertical
        let above = blob.y < otherBlob.y
        if (above) {
            if (wouldBumpRight(blob, blobArray)) {
                return blob
            }
            //move right
            return new Blob(blob.x +1, blob.y, blob.colour, blob.isPlayerControlled)
        } else { //below
            if (wouldBumpRight(otherBlob, blobArray)) {
                //move up and left
                return new Blob(blob.x -1, blob.y -1, blob.colour, blob.isPlayerControlled)
            }
            //move up
            return new Blob(blob.x, blob.y -1, blob.colour, blob.isPlayerControlled)
        }
    }
}

function ifPlayerControlled(func, gameState) {
    let newBlobArray = gameState.Blobs.map(blob => {
        if (blob.isPlayerControlled) {
            blob = func(blob, gameState);
        }
        return blob
    });
    gameState.Blobs = newBlobArray
    return gameState
}

function moveLeftIfNotAtEdge(blob, gameState) {
    let otherPlayerControlledBlob = getOtherPlayerControlledBlob(blob, gameState.Blobs)

    function wouldGoOffTheLeftEdge(blob1) {
        return blob1.x <= 1;
    }

    function cantMoveLeft(blob3, blobArray) {
        return wouldGoOffTheLeftEdge(blob3) || hasNonPCBlobDirectlyLeft(blob3, blobArray);
    }

    if (
        cantMoveLeft(blob, gameState.Blobs)
        ||
        existsAnd(cantMoveLeft,otherPlayerControlledBlob, gameState.Blobs)
    ) {
        return blob
    } else {
        return new Blob(blob.x -1, blob.y, blob.colour, blob.isPlayerControlled)
    }
}

function wouldGoOffRightSide(blob) {
    return blob.x >= 6;
}

function wouldBumpRight(blob, blobArray) {
    return wouldGoOffRightSide(blob) || hasNonPCBlobDirectlyRight(blob, blobArray);
}

function existsAnd(func, blob, blobArray) {
    return blob !== undefined && func(blob, blobArray)
}

function moveRightIfNotAtEdge(blob, gameState) {
    let otherPlayerControlledBlob = getOtherPlayerControlledBlob(blob, gameState.Blobs);
    if (wouldBumpRight(blob, gameState.Blobs) || existsAnd(wouldBumpRight, otherPlayerControlledBlob, gameState.Blobs)) {
        return blob
    } else {
        return new Blob(blob.x + 1, blob.y, blob.colour, blob.isPlayerControlled)
    }
}

function moveUp(blob) {
    blob.y -= 1 //coords start at bottom left apparently. That's a touch confusing.
    return blob
}

function moveDown_OrCrashIfAtBottom_orOtherPCBlobShouldCrash(blob, gameState) {
    function shouldCrashInMyOwnRight(blob1, allBlobs) {
        return isAtBottom(blob1) || hasNonPCBlobDirectlyBelow(blob1, allBlobs);
    }

    let otherPCBlob = getOtherPlayerControlledBlob(blob, gameState.Blobs);
    let otherPcBlobExistsAndShouldCrash = otherPCBlob !== undefined && shouldCrashInMyOwnRight(otherPCBlob, gameState.Blobs)
    if (shouldCrashInMyOwnRight(blob, gameState.Blobs) || otherPcBlobExistsAndShouldCrash){
        return new Blob(blob.x, blob.y, blob.colour, false)
    } else {
        return new Blob(blob.x, blob.y +1, blob.colour, blob.isPlayerControlled)
    }
}

function ProcessAnimationFrame(gameState) {
    let mapResultsArray = gameState.Blobs.map(MoveDownOneSpaceIfShouldMoveDown);
    let somethingMoved = mapResultsArray.some(result => result.didMove)

    gameState.Blobs = mapResultsArray.map(r => r.Blob)
    return {moved: somethingMoved, gameState: gameState};
}

function MoveDownOneSpaceIfShouldMoveDown(blob, index, array) {
    let shouldStayStill =
        isAtBottom(blob)
        || hasNonPCBlobDirectlyBelow(blob, array)
        || blob.isPlayerControlled;

    if (shouldStayStill) {
        return {Blob: blob, didMove: false} ///that won't work in a map - unless I map it again. Fine!
    } else {
        return {Blob: MoveBlobDown(blob), didMove: true}
    }
}

function MoveBlobDown(blob) {
    blob.y += 1;
    return blob;
}

function moveBlobsThatShouldFallToRestingPosition(gameState) {
    let result = ProcessAnimationFrame(gameState);
    if (result.moved) {
        return moveBlobsThatShouldFallToRestingPosition(result.gameState)
    } else {
        return result.gameState
    }
}

function isAtBottom(blob) {
    return (blob.y === 12)
}

module.exports = {
    // runFramesUntilNothingElseChanges,
    ProcessAnimationFrame,
    spawnPlayerControlledBlobs,
    keyLeft,
    keyRight,
    keyDown,
    keyUp,
    keyRotate,
    moveBlobsThatShouldFallToRestingPosition,
    whereShouldIBeOnRotate
}