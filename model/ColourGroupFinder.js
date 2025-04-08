//import {hasNonPCBlobDirectlyBelow, getOtherPlayerControlledBlob, hasNonPCBlobDirectlyRight, hasNonPCBlobDirectlyLeft} from '../model/GameStateQueries.js';
import {Blob} from './Blob.js';
import { GameState } from './GameState.js';
import {BlobGrid} from '../model/BlobGrid.js';

function markForPopping (blobArray) {
    var blobGrid = new BlobGrid(blobArray);
    let currentGroup = 1;
    let groupCount = [];
    groupCount[0] = 0; //no group 0, but I don't want an undefined element?
    for (let y = 1; y <= 12; y++) {
        //foreach row going down.
        //left to right, assign blobs a colour group. If same as left or above, same group.
        //Otherwise - next group!
        for (let x = 1; x <= 6; x++) {
            let oBlob = blobGrid.GetBlob(x,y);
            if (oBlob.hasBlob){
                let currentBlob = oBlob.blob;
                const hasBlobToLeft = x > 1 && blobGrid.GetBlob(x - 1, y).hasBlob;
                const hasBlobAbove = y > 1 && blobGrid.GetBlob(x, y-1).hasBlob;
                //is there a blob to the left?
                if (hasBlobToLeft || hasBlobAbove) {
                    const blobUnderScrutiny = hasBlobToLeft ? blobGrid.GetBlob(x - 1, y).blob :  blobGrid.GetBlob(x, y-1).blob;
                    AdoptPoppingGroupIfColourMatches(blobUnderScrutiny, currentBlob, groupCount);
                } else {
                    assignToNewGroupAndIncrement(currentBlob, groupCount);
                }
            }
            blobGrid.SetBlob(x,y,oBlob);
            //todo assign oblob back into the BlobGrid
        }
    }
    //if any group has more than 4, mark for popping.

    // var popOrNot = blobArray.filter(b => b.colour == 1).length >=4;

    let nb = blobArray.map(b => newBlobWithPopSetCorrectly(b));

    return nb;

    function newBlobWithPopSetCorrectly(b) {
        let popOrNot = groupCount[b.poppingGroup] >= 4; //has popping group != 0 and it's popping group has more than 4 total.
        return new Blob(b.x, b.y, b.colour, b.isPlayerControlled, b.x, b.y, popOrNot, b.poppingGroup);
    }

    function AdoptPoppingGroupIfColourMatches(blobUnderScrutiny, currentBlob, groupCount) {
    if (blobUnderScrutiny.colour === currentBlob.colour) {
        //assign current blob's popping group to that of the one under scrutiny.
        currentBlob.poppingGroup = blobUnderScrutiny.poppingGroup;
        groupCount[currentBlob.poppingGroup] = groupCount[currentBlob.poppingGroup] + 1;
    } else {
        //Otherwise assign a new one.
        assignToNewGroupAndIncrement(currentBlob, groupCount);
    }
}

function assignToNewGroupAndIncrement(currentBlob, groupCount) {
    currentBlob.poppingGroup = currentGroup;
    groupCount[currentBlob.poppingGroup] = 1;
    currentGroup++;
}
}


function markForPoppingGameState (gameState) {
    console.log("Marking for popping. GameState Before:" + JSON.stringify(gameState));
    let makedGameState = new GameState(markForPopping(gameState.Blobs), false, gameState.nextColours);
    console.log("Marking for popping. GameState After:" + JSON.stringify(makedGameState));
    return makedGameState;
}

export {
    markForPopping,
    markForPoppingGameState
}


//using binary search thoughts: - as usual, the object of the exercise is to copy a blob array into a new blob array (immutably).
//Visit each blob, determine if it's a popper, and then copy them into the new array when you're sure.
// Once finished with any poppers, copy the remaining, non-popping blobs? Should end up with all the blobs, correctly marked?
// I find myself once again thinking about the use of the blob array as a set of blobs, rather than a 2 dimensional array of fixed size

//my GameStateQueries class is complicated because blob array is really a set of blobs, so needs to be searched through
//regularly to find if blobs are next to each other etc etc.

//can use a javascript array as a queue
function arrayIsQueue () {
    var queue = []
    queue.push(2); //[2]
    queue.push(5); //[2,5]
    var i = queue.shift(); //[5]
    console.log(i); // 2
}

//js sets
//add and check methods

function playWithSets() {
    var s = Set();
    s.add(2);
    s.add(3);
    s.has(2); //true
    s.has(4); //false
    s.delete(2);
    s.has(2); //false
}


//pseudo Python code
/**
 * 
 * frontier = queue()
 * frontier.put(start)
 * reached = set()
 * reached.add(start)
 * 
 * while not frontier.empty():
 *  current = frontier.get()
 *  for next in graph.neighbours (current)
 *      if next not in reached
 *          frontier .put(next)
 *          reached.add (next)
 */

