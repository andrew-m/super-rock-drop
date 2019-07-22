
function hasNonPCBlobDirectlyBelow(blob, allBlobs) {
    return allBlobs.filter(b => b !== blob) //all the blobs except the blob in question
        .some(b =>
            isInSameColumn(b, blob) //same column
            &&
            isInRowBelow(b, blob) //one lower down
            &&
            !b.isPlayerControlled
        )
}

function getOtherPlayerControlledBlob(blob, oldBlobsArray) {
    return oldBlobsArray.find((b) => {
        return b.isPlayerControlled && (blob !== b)
    });
}

function isInSameColumn(b, blob) {
    return b.x === blob.x;
}
function isInRowBelow(b, blob) {
    return b.y === (blob.y + 1);
}
function isInSameRow(b, blob) {
    return b.y === blob.y;
}

function hasNonPCBlobDirectlyRight(blob, allBlobs) {
    return allBlobs.filter(b => !b.isPlayerControlled) //all the non PC blobs
        .some(b =>
            isInSameRow(b, blob)
            &&
            b.x === (blob.x + 1)
        )
}


function hasNonPCBlobDirectlyLeft(blob2, allBlobs) {
    return allBlobs.filter(b => !b.isPlayerControlled) //all the non PC blobs
        .some(b =>
            isInSameRow(b, blob2)
            &&
            b.x === (blob2.x - 1)
        )
}

module.exports = {
    hasNonPCBlobDirectlyBelow,
    getOtherPlayerControlledBlob,
    hasNonPCBlobDirectlyRight,
    hasNonPCBlobDirectlyLeft
}