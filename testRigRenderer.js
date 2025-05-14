import {GameState, primeNextColour } from './model/GameState.js';
import { CanvasGameRenderer } from './model/CanvasGameRenderer.js';

import {keyLeft, keyRight, keyDown, keyRotate, animationComplete} from './model/GameEngine.js';
import {calculateAnimationPosition} from './model/AnimationEngine.js';

// let GameEngineController = require('./model/GameEngineController.js'); //fossil?
import {KeyboardInput, keyRegistration} from "./model/KeyboardInput.js";
import {Blob} from "./model/Blob.js";
import {markForPoppingGameState} from "./model/ColourGroupFinder.js"

/* 
Plan for this test Rig.
Unbind all the events, clock/time and keyboard.
Replace with some buttons.
Have a game state on the left, click an event (keypress, clock tick etc) 
to get a new game state - render that on the right.
Ideally some sort of inspection - ie render the gamestates as prettified json.

*/


let gameState
let canvasGameRendererLeft

const setup = function (doc) {
    if (doc === null || doc === undefined) {
        return;
    }

    canvasGameRendererLeft = new CanvasGameRenderer(doc.getElementById("canvasLeft"));
    doc.querySelector("#leftBtn").addEventListener("click", () => gameState = keyLeftAndAnimate(canvasGameRendererLeft, gameState));
    doc.querySelector("#rightBtn").addEventListener("click", () => gameState = keyRightAndAnimate(canvasGameRendererLeft, gameState));
    doc.querySelector("#rotateBtn").addEventListener("click", () => gameState = keyRotateAndAnimate(canvasGameRendererLeft, gameState));
    doc.querySelector("#downBtn").addEventListener("click", () => gameState = keyDownAndAnimate(canvasGameRendererLeft, gameState));
    doc.querySelector("#animateBtn").addEventListener("click", () => gameState =  AnimateAndRender(canvasGameRendererLeft, gameState));
    doc.querySelector("#tickBtn").addEventListener("click", () => gameState = ClockTickOneSecond(canvasGameRendererLeft, gameState));
    doc.querySelector("#checkForPops").addEventListener("click", () => gameState = CheckForPopsAndAnimate(canvasGameRendererLeft, gameState));
    canvasGameRendererLeft.Setup();

    // let newBlobArray = [
    //     // new Blob(1, 1, 1),
    //     // new Blob(1, 11, 1),
    //     // new Blob(6, 12, 2),
    //     // new Blob(3, 4, 1),
    //     // new Blob(3, 12, 3),
    //     // new Blob(3, 1, 0, true),
    //     // new Blob(4, 1, 1, true)
    // ];

    // let newBlobArray = [
    //     //x y is from a top left corner origin. 6, 12 is bottom right.
    //     new Blob(1, 12, 1),
    //     new Blob(2, 12, 1),
    //     new Blob(3, 12, 1),
    //     new Blob(4, 12, 1),
    // ];

    // let newBlobArray = [ //vertical group with diff coloured blobs to left.
    //         new Blob(2, 9, 2),
    //         new Blob(2, 10, 3),
    //         new Blob(2, 11, 4),
    //         new Blob(2, 12, 5),
    //         new Blob(1, 9, 1),
    //         new Blob(1, 10, 1),
    //         new Blob(1, 11, 1),
    //         new Blob(1, 12, 1)
    // ]

    // let newBlobArray = [
    //         new Blob(1, 11, 2),
    //         new Blob(2, 11, 3),
    //         new Blob(3, 11, 4),
    //         new Blob(4, 11, 5),
    //         new Blob(1, 12, 1),
    //         new Blob(2, 12, 1),
    //         new Blob(3, 12, 1),
    //         new Blob(4, 12, 1)
    // ]


    // let newBlobArray = [ //Square group
    //     new Blob(1, 11, 1),
    //     new Blob(2, 11, 1),
    //     new Blob(1, 12, 1),
    //     new Blob(2, 12, 1),
    // ]


    let newBlobArray = [ //L shapes group - this one fails!
        new Blob(1, 12, 1),
        new Blob(2, 12, 1),
        new Blob(3, 12, 1),
        new Blob(3, 11, 1),
    ]

    // let newBlobArray = [ //L shapes group - this one is OK!
    //     new Blob(1, 11, 1),
    //     new Blob(1, 12, 1),
    //     new Blob(2, 12, 1),
    //     new Blob(3, 12, 1),
    // ]

    // let newBlobArray = [ //L shapes group - this one is OK!
    //     new Blob(1, 11, 1),
    //     new Blob(2, 11, 1),
    //     new Blob(3, 11, 1),
    //     new Blob(3, 12, 1),
    // ]

    // let newBlobArray = [ //L shapes group - this one is OK
    //     new Blob(1, 11, 1),
    //     new Blob(2, 11, 1),
    //     new Blob(3, 11, 1),
    //     new Blob(1, 12, 1),
    // ]

    gameState = new GameState(newBlobArray, true)
    gameState = primeNextColour(gameState)
    console.log("Primed^^^")
    console.log(JSON.stringify(gameState))
    canvasGameRendererLeft.RenderGameState(gameState)

    let keys = [
        new keyRegistration("KeyZ", () => gameState = keyLeft(gameState)),
        new keyRegistration("KeyX", () => gameState = keyRight(gameState)),
        new keyRegistration(
            "Period",
            () => gameState = keyDown(gameState),
            true,
            50
        ),
        new keyRegistration("Space", () => gameState = keyRotate(gameState))
    ]

    let ki = new KeyboardInput(keys);

    window.addEventListener("keydown", (e) => ki.keyDown(e), false);
    window.addEventListener("keyup", (e) => ki.keyUp(e), false);

    // loop();
}

function keyLeftAndAnimate (gameRenderer, gameState) {
    return AnimateAndRender(gameRenderer, keyLeft(gameState));
}

function keyRightAndAnimate (gameRenderer, gameState) {
    return AnimateAndRender(gameRenderer, keyRight(gameState));
}

function keyRotateAndAnimate (gameRenderer, gameState) {
    return AnimateAndRender(gameRenderer, keyRotate(gameState));
}

function keyDownAndAnimate (gameRenderer, gameState) {
    return AnimateAndRender(gameRenderer, keyDown(gameState));
}

function CheckForPopsAndAnimate (gameRenderer, gameState) {
    return AnimateAndRender(gameRenderer, markForPoppingGameState(gameState))
}

function AnimateAndRender (gameRenderer, gameState) {
    if (gameState.needsAnimation) {
        gameState = calculateAnimationPosition(gameState, animationComplete)
        gameState = primeNextColour(gameState) //this means we prime next colour on every animation frame when animation is needed, which seems unneeded! but without it at present colours stop rotating
    }

    gameRenderer.RenderGameState(gameState);
    return gameState;
}

function ClockTickOneSecond (gameRenderer, gameState) {
    gameState = keyDown(gameState);
    return AnimateAndRender(gameRenderer, gameState);
}

export {
    setup
}