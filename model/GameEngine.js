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
    keyUp
}