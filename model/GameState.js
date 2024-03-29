class GameState {
    constructor(blobs = [], needsAnimation = false, nextColours = []) {
        this.Blobs = blobs
        this.needsAnimation = needsAnimation
        this.nextColours = nextColours
        this.colourMap = colourMap
    }

    withBlobs(blobs) {
        return null
    }
}
 //ToDo this is probably a rendering concern, not a game-state concern, should just be the index we store, 
 //renderers can map it to colours (or graphics)
 //todo we should also probably store (and expose) the number of colurs being used, rather than counting this array length later on.
const colourMap = ["#cc0000",
    "#00cc00",
    "#2020cc",
    "#00aaaa",
    "#aa00ff",
]


function primeNextColour(gameState) {
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    let colourArray = [
        getRndInteger(0, colourMap.length -1),
        getRndInteger(0, colourMap.length -1)
    ]
    console.log("Colour Array: " + JSON.stringify(colourArray))
    return new GameState(gameState.Blobs, gameState.needsAnimation, colourArray)
}

export {
    GameState,
    primeNextColour
}