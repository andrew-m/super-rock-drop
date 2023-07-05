class BlobGrid {
    constructor (blobArray) {
        this.blobArray = blobArray;
        
    }

    GetOldArray () {
        return this.blobArray;
    }
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

