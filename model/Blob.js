class Blob {
    constructor (x, y, colour = 1, isPlayerControlled = false, oldx = x, oldy = y, needsPopping = false, poppingGroup = 0) {
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.isPlayerControlled = isPlayerControlled;
        this.oldx = oldx;
        this.oldy = oldy;
        this.needsPopping = needsPopping;
        this.poppingGroup  = poppingGroup;
    }
}

export { Blob }