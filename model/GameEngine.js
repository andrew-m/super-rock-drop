
import {GameState} from '../model/GameState.js';
import {Blob} from '../model/Blob.js';
import {hasNonPCBlobDirectlyBelow, getOtherPlayerControlledBlob, hasNonPCBlobDirectlyRight, hasNonPCBlobDirectlyLeft} from '../model/GameStateQueries.js';
import { markForPopping } from './ColourGroupFinder.js';

function keyLeft(gameState) {
    return ifPlayerControlled(moveLeftIfNotAtEdge, gameState)
}

function keyRight(gameState) {
    return ifPlayerControlled(moveRightIfNotAtEdge, gameState);
}

function keyDown(gameState) {
    let newGameState = ifPlayerControlled(moveDown_OrCrashIfAtBottom_orOtherPCBlobShouldCrash, gameState);
    return moveBlobsThatShouldFallToRestingPosition(newGameState)
}

function keyRotate(gameState) {
    let oldBlobsArray = gameState.Blobs;
    var newGameState = ifPlayerControlled(whereShouldIBeOnRotate, gameState)
    if (pcBlobHasCrashedIntoOtherBlob(newGameState.Blobs)) {
        let KilledBlobsArray = makePCBlobsNonPC(oldBlobsArray);
        return new GameState(KilledBlobsArray)
    }

    return newGameState
}

function spawnPlayerControlledBlobsIfNoPCBlobsOrBlobsMarkedForPopping(gameState) {
    let newBlobArray = gameState.Blobs;
    if (! gameState.Blobs.some(b => b.isPlayerControlled === true) && ! gameState.Blobs.some(b => b.needsPopping === true)) {
        //Immutable equivalent of array.push
        newBlobArray = [...gameState.Blobs,
            new Blob(3, 1, gameState.nextColours[0], true),
            new Blob(4, 1, gameState.nextColours[1], true)
        ];
    }
    return new GameState(newBlobArray, gameState.needsAnimation, []);
}

function areInTheSamePlace(c, b) {
    return (c.x === b.x && c.y === b.y);
}

function blobIsInSamePlaceAsTheseBlobs(oldBlobArray, b) {
    let b1 = oldBlobArray.some(c => areInTheSamePlace(c, b));
    return b1
}

function pcBlobHasCrashedIntoOtherBlob(currentBlobArray) {
    let justPCBlobs = currentBlobArray.filter(a => {return a.isPlayerControlled});
    let nonPCBlobs = currentBlobArray.filter(a => {return !a.isPlayerControlled});
    let b3 = justPCBlobs.some(b => {
            return blobIsInSamePlaceAsTheseBlobs(nonPCBlobs, b);
        });
    return b3
}

function makePCBlobsNonPC(oldBlobsArray) {
    return oldBlobsArray.map(b => b.isPlayerControlled ? new Blob(b.x, b.y, b.colour, false) : b);
}


function whereShouldIBeOnRotate(blob, gameState) {
    let blobArray = gameState.Blobs
    let otherBlob = getOtherPlayerControlledBlob(blob, blobArray)
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

function moveDown_OrCrashIfAtBottom_orOtherPCBlobShouldCrash(blob, gameState) {
    function shouldCrashInMyOwnRight(blob1, allBlobs) {
        return isAtBottom(blob1) || hasNonPCBlobDirectlyBelow(blob1, allBlobs);
    }

    let otherPCBlob = getOtherPlayerControlledBlob(blob, gameState.Blobs);
    let otherPcBlobExistsAndShouldCrash = otherPCBlob !== undefined && shouldCrashInMyOwnRight(otherPCBlob, gameState.Blobs)
    if (shouldCrashInMyOwnRight(blob, gameState.Blobs) || otherPcBlobExistsAndShouldCrash){
        gameState.needsAnimation = true
        return new Blob(blob.x, blob.y, blob.colour, false)
    } else {
        return new Blob(blob.x, blob.y +1, blob.colour, blob.isPlayerControlled)
    }
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
    if (blob.oldy === undefined) {
        blob.oldy = blob.y
    }
    if (blob.oldx === undefined) {
        blob.oldx = blob.x
    }
    blob.y += 1;
    return blob;
}

function moveBlobsThatShouldFallToRestingPosition(gameState) {
    let mapResultsArray = gameState.Blobs.map(MoveDownOneSpaceIfShouldMoveDown);
    let somethingMoved = mapResultsArray.some(result => result.didMove)

    gameState.Blobs = mapResultsArray.map(r => r.Blob)
    let result = {moved: somethingMoved, gameState: gameState};
    if (result.moved) {
        gameState.needsAnimation = true
        return moveBlobsThatShouldFallToRestingPosition(result.gameState)
    } else {
        return result.gameState
    }
}

function isAtBottom(blob) {
    return (blob.y === 12)
}

function animationComplete(gameState) {
    //todo Before spawning player controlled blobs
    //we should check and pop any blobs that should pop
    //Ideally we should then continue animating falling
    //If, and only if, there's nothing left to pop, and nothing left to fall, we should spawn new player blobs.
    
    let newGameState = spawnPlayerControlledBlobsIfNoPCBlobsOrBlobsMarkedForPopping(gameState);
    let blobsWithoutOldPositions = newGameState.Blobs.map(b => new Blob(b.x, b.y, b.colour, b.isPlayerControlled));

    let gameState1 = new GameState(
        blobsWithoutOldPositions,
        false,
        newGameState.nextColours
    );
    return gameState1
}

//Todo Game engine exports things just for testing. Make sure they're pure functions, and move them to another class/file/thing.

export {
    keyLeft,
    keyRight,
    keyDown, //Also used for 1 second ticks
    keyRotate,
    animationComplete, //animation engine, renderer, testRigRenderer and tests.
//***********************************/
    spawnPlayerControlledBlobsIfNoPCBlobsOrBlobsMarkedForPopping, // tests only
    moveBlobsThatShouldFallToRestingPosition, //tests only
    whereShouldIBeOnRotate, //tests only
    pcBlobHasCrashedIntoOtherBlob //tests only
}