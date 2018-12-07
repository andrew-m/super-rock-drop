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

//Todo get rid of any concept of animation frames in Game Engine - they're not game engine events!


function keyLeft(gameState) {
    return ifPlayerControlled(moveLeft, gameState)
}
function keyRight(gameState) {
    return ifPlayerControlled(moveRight, gameState);
}
function keyDown(gameState) {
    return ifPlayerControlled(moveDown, gameState);
}
function keyUp(gameState) {
    return ifPlayerControlled(moveUp, gameState);
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


//todo this isn't quite right.
//moves blobs a max of one square (probably). Requires multiple calls to complete,
//by which time many blobs might have moved two squares.
//each blob should move one square only
//but each blob _should_ move - even (especially) if above another square that moved.
// No. Things that fall, fall all the way. This is why we need to seperate the "tick" from everything else.
// Player operated blobs don't fall, but they do tick down.
// Animation (slow falling) is not a Game engine concern, events would pause during that time.
// Although other concerns can store state in the gameState - such as the difference between "target" location
// and current location during an animation

//Question - game engine initiated events (eg, player controlled blob hits the bottom - causes pops and then a
// new player entity... Is that all managed from the same origin event (keyboard, clock tick)

//It does feel like those are derived events, triggered by a smaller subset of fundamental events.
//clock tick, keyboard press. Rocks arrive. Who decides what colour next player blobs are?
// Would it keep things simple if to start with, gameEngine asks for them? Provided with a random-blob selector.
// could be implemented locally for now, and some sort of network one later. Which would solve a problem we don't
// currently have (people cheating in network games by seeing the backlog of blobs further)

/**
 * @return {boolean}
 */
function ProcessAnimationFrame(gameState) {
    let mapResultsArray = gameState.Blobs.map(MoveDownOneSpaceIfShouldMoveDown);
    let somethingMoved = mapResultsArray.some(result => result.didMove)

    gameState.Blobs = mapResultsArray.map(r => r.Blob)
    return {moved: somethingMoved, gameState: gameState};
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

function moveBlobsThatShouldFallToRestingPosition(gameState) {
    let result = ProcessAnimationFrame(gameState);
    if (result.moved) {
        return moveBlobsThatShouldFallToRestingPosition(result.gameState)
    } else {
        return result.gameState
    }
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
    // runFramesUntilNothingElseChanges,
    HasBlobDirectlyBelow,
    ProcessAnimationFrame,
    keyLeft,
    keyRight,
    keyDown,
    keyUp,
    moveBlobsThatShouldFallToRestingPosition
}