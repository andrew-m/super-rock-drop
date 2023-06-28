//import {hasNonPCBlobDirectlyBelow, getOtherPlayerControlledBlob, hasNonPCBlobDirectlyRight, hasNonPCBlobDirectlyLeft} from '../model/GameStateQueries.js';
import {Blob} from './Blob.js';

function markForPopping (blobArray) {
    let nb = blobArray.map(b => new Blob(b.x, b.y, b.colour, false, b.x, b.y, true));
    return nb;
}

export {
    markForPopping
}