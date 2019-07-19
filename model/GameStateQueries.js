
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

function isInSameColumn(b, blob) {
    return b.x === blob.x;
}
function isInRowBelow(b, blob) {
    return b.y === (blob.y + 1);
}


module.exports = {
    hasNonPCBlobDirectlyBelow
}