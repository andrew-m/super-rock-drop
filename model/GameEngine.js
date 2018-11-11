//external events are:
//clock ticks
//keyboard presses
//network events arriving.

//Which result in changes to the game state
//such as entities moving down
//or being created
//or moving side to side
//or disappearing

//on loop render the game
//lets start with clock tick events.
//they move entities down
//unless entity or floor below them.

//Game engine does NOT contain game state.
//It acts upon an event, and a game state, to create a new game state.

//Immutable or mutable game state? I think mutable will be fine.


function ProcessEvent (event, gameState) {

}

module.exports = {
    ProcessEvent
}