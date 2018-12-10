//going to need some persistent state - so this feels like a class.

class keyRegistration {
    constructor(code, callBack) {
        this.code = code
        this.callBack = callBack
        this.ready = true
    }

    setReady(ready) {
        this.ready = ready
    }
}

class KeyboardInput {
    constructor(arrayOfKeyRegistrations) {
        this.keyRegistrations = arrayOfKeyRegistrations
    }

    keyDown (event) {
        let keyRegistration = this.keyRegistrations.find(keyReg => keyReg.code === event.code);
        if (keyRegistration !== undefined && keyRegistration.ready) {
            keyRegistration.callBack()
            keyRegistration.setReady(false)
        }
    }

    keyUp (event) {
        let keyRegistration = this.keyRegistrations
            .find(keyReg => keyReg.code === event.code);

        if (keyRegistration !== undefined) {
            keyRegistration.setReady(true);
        }
    }
}

module.exports = {KeyboardInput, keyRegistration}
