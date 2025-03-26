class OptionalBlob {
    constructor (blob = undefined) {
        this.blob = blob;
        if (blob === undefined || blob === null) {
            this.hasBlob = false;
        } else {
            this.hasBlob = true;
        }
    }
}

export { OptionalBlob }