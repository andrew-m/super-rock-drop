//import {hasNonPCBlobDirectlyBelow, getOtherPlayerControlledBlob, hasNonPCBlobDirectlyRight, hasNonPCBlobDirectlyLeft} from '../model/GameStateQueries.js';
import {Blob} from './Blob.js';

function markForPopping (blobArray) {
    var popOrNot = blobArray.filter(b => b.colour == 1).length >=4;
    let nb = blobArray.map(b => new Blob(b.x, b.y, b.colour, false, b.x, b.y, popOrNot));

    return nb;
}

export {
    markForPopping
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

