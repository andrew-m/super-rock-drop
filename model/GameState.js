class GameState {
    constructor(blobs = [], needsAnimation = false, nextColours = []) {
        this.Blobs = blobs
        this.needsAnimation = needsAnimation
        this.nextColours = nextColours
    }
}

const colours = [
    "#cc0000",
    "#00cc00",
    // "#2020cc",
    "#00aaaa",
    "#aa00ff",
    // "#aaaa00",
]

function primeNextColour(gameState) {
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    let colourArray = [
        colours[getRndInteger(0, colours.length -1)],
        colours[getRndInteger(0, colours.length -1)]
    ]
    console.log("Colour Array: " + JSON.stringify(colourArray))
    return new GameState(gameState.Blobs, gameState.needsAnimation, colourArray)
}

module.exports = {
    GameState,
    colours,
    primeNextColour
}