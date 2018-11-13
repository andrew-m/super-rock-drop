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


function ProcessTickEvent (gameState) {
    gameState.Blobs  = gameState.Blobs.map(MoveDownIfNotAtBottom);
    return gameState;
}

function MoveDownIfNotAtBottom (blob) {
    if (IsAtBottom(blob)) {
        return blob
    } else {
        return MoveBlobDown(blob)
    }
}

function MoveBlobDown (blob) {
    blob.y += 1;
    return blob;
}

/**
 * @return {boolean}
 */
function IsAtBottom (blob) {
    return (blob.y === 12)
}

module.exports = {
    ProcessTickEvent
}