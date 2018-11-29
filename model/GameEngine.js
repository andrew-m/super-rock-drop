//external events are:
//clock ticks
//keyboard presses
//network events arriving.

//Which result in changes to the game state
//such as blobs moving down
//or being created
//or moving side to side
//or disappearing

//on loop render the game
//lets start with clock tick events.
//they move blobs down
//unless blob or floor below them.

//Game engine does NOT contain game state.
//It acts upon an event, and a game state, to create a new game state.

//Immutable or mutable game state? I think mutable will be fine.

let timeAtLastTick = 0

function AnimationLoop(timestamp, gameRenderer, gameState, input) {

    gameState = extractKeyboardEvents(input, gameState)
    gameRenderer.RenderGameState(gameState)

    if (timestamp - timeAtLastTick > 1000) {
        gameState = ProcessAnimationFrame(gameState).gameState
        gameRenderer.RenderGameState(gameState)
        timeAtLastTick = timestamp
    }
    return gameState
}

//todo extract and unit test extractKeyboardEvents and processKeyPress
//also seperate the tick logic - as we want game engine to be a pure, and
//deterministic processor of events.

function ifPlayerMoveLeft(gameState) {
    return ifPlayerControlled(moveLeft, gameState);
}

function ifPlayerMoverRight(gameState) {
    return ifPlayerControlled(moveRight, gameState);
}

function ifPlayerMoveUp(gameState) {
    return ifPlayerControlled(moveUp, gameState);
}

function ifPLayerMoveDown(gameState) {
    return ifPlayerControlled(moveDown, gameState);
}

function processKeyPress(keyPressed, gameState) {
    switch (keyPressed) {
        case "zed":
            gameState = ifPlayerMoveLeft(gameState);
            break;
        case "ex":
            gameState = ifPlayerMoverRight(gameState);
            break;
        case "colon":
            gameState = ifPlayerMoveUp(gameState);
            break;
        case "dot":
            gameState = ifPLayerMoveDown(gameState);
            break;
    }
    return gameState
}

function extractKeyboardEvents(input, gameState) {

    input = Object.entries(input.discretePressedKeys).map(keyArray => {
        if (keyArray[1].pressed) {
            gameState = processKeyPress(keyArray[0], gameState)
            input.discretePressedKeys[keyArray[0]].pressed = false;
        }
    })
    return gameState
}

function ifPlayerControlled(func, gameState) {
    gameState.Blobs = gameState.Blobs.map(blob => {
        if (blob.isPlayerControlled) {
            blob = func(blob);
        }
        return blob
    })
    return gameState
}

function moveLeft(blob) {
    blob.x -= 1
    return blob
}

function moveRight(blob) {
    blob.x += 1
    return blob
}

function moveUp(blob) {
    blob.y -= 1 //coords start at bottom left apparently. That's a touch confusing.
    return blob
}

function moveDown(blob) {
    blob.y += 1
    return blob
}


/**
 * @return {boolean}
 */
function ProcessAnimationFrame(gameState) {
    let mapResultsArray = gameState.Blobs.map(MoveDownOneSpaceIfShouldMoveDown);
    let somethingMoved = mapResultsArray.some(result => result.didMove)

    gameState.Blobs = mapResultsArray.map(r => r.Blob)
    return {moved: somethingMoved, gameState: gameState};
}

function runFramesUntilNothingElseChanges(gameState) {
    let result = ProcessAnimationFrame(gameState);
    if (result.moved) {
        return runFramesUntilNothingElseChanges(result.gameState)
    } else {
        return result.gameState
    }
}

function MoveDownOneSpaceIfShouldMoveDown(blob, index, array) {
    let shouldStayStill =
        IsAtBottom(blob)
        || HasBlobDirectlyBelow(blob, index, array)
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

/**
 * @return {boolean}
 */
function IsAtBottom(blob) {
    return (blob.y === 12)
}

function isInSameColumn(b, blob) {
    return b.x === blob.x;
}

function isInRowBelow(b, blob) {
    return b.y === (blob.y + 1);
}

/**
 * @return {boolean}
 */
function HasBlobDirectlyBelow(blob, i, allBlobs) {
    return allBlobs.filter(b => b !== blob) //all the blobs except the blob in question
        .some(b =>
            isInSameColumn(b, blob) //same column
            &&
            isInRowBelow(b, blob) //one lower down
        )
}

module.exports = {
    runFramesUntilNothingElseChanges,
    HasBlobDirectlyBelow,
    AnimationLoop
}