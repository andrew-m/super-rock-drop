//going to need some persistent state - so this feels like a class.

class keyRegistration {
    constructor(code, callBack, continuous = false, delay = 100) {
        this.code = code
        this.callBack = callBack
        this.continuous = continuous
        this.delay = delay
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
            if (keyRegistration.continuous) {
                setTimeout(function(){ keyRegistration.setReady(true); }, keyRegistration.delay);
            }
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
