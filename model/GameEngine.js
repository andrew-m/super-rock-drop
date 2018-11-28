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

    extractKeyboardEvents(input, gameState)
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

function processKeyPress(keyPressed, gameState) {
    function moveLeft(blob) {
        blob.x -= 1
    }

    function moveRight(blob) {
        blob.x += 1
    }

    function moveUp(blob) {
        blob.y -= 1 //coords start at bottom left apparently. That's a touch confusing.
    }

    function moveDown(blob) {
        blob.y += 1
    }

    function ifPlayerControlled(func) {
        gameState.Blobs.map(blob => {
            if (blob.isPlayerControlled) {
                func(blob);
            }
        })
    }

    switch (keyPressed) {
        case "zed":
            ifPlayerControlled(moveLeft);
            break;
        case "ex":
            ifPlayerControlled(moveRight);
            break;
        case "colon":
            ifPlayerControlled(moveUp);
            break;
        case "dot":
            ifPlayerControlled(moveDown);
            break;
    }
}

function extractKeyboardEvents(input, gameState) {
    input = Object.entries(input.discretePressedKeys).map(keyArray => {
        if (keyArray[1].pressed) {
            processKeyPress(keyArray[0], gameState)
            input.discretePressedKeys[keyArray[0]].pressed = false;
        }
    })
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