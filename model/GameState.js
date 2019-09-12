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

module.exports = {
    GameState,
    primeNextColour
}