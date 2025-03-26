import { OptionalBlob } from "./OptionalBlob.js";

class BlobGrid {
    twoDArray;
    constructor (blobArray) {
        this.blobArray = blobArray;
        this.twoDArray = Get2DArrayFromArray(blobArray);
    }

    GetOldArray () {
        return this.blobArray;
    }

    GetBlob(x,y) {
        return this.twoDArray[x-1][y-1];
    }
}

function Get2DArrayFromArray (blobArray) {
    let thing = Array(6);
    //initialise the array with empty blobs
    for (let index = 0; index < 6; index++) {
        let column = [];
        for (let j = 0; j < 12; j++) {
            column[j] = new OptionalBlob();
        }
        thing[index] = column; 
    }
    //still need to populate the existing blobs.
    blobArray.forEach(blob => {thing[blob.x-1][blob.y-1] = new OptionalBlob(blob)});

    return thing;
}

export { BlobGrid }

//think about this a moment.

//Need to be able to extract an old style array from the grid, for compatibility.
//Therefor the blobs still need to know their locations.
//But also need to be in the correct place in the grid.
//And the grid is going to answer questions previously answered by the GameStateQueries.js.
//When things change - and we need to create a new Grid from blobs - can just shove them in to the correct places?
//The only difference is we slot them in the correct locations in the 2d array (or whatever)
//And can then more easily find neighbours and ask questions.
//Probably also needs to know it's own size/limits/boundaries.
//Done.

//2D arrays work OK - but zero indexed of course. Annoying as the game is 1 indexed.
//Could make a semantic wrapper (which is kinda what this class was maybe supposed to be!)
