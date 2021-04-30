const params = new URLSearchParams(location.search)
const debug = params.get("debug")

export class Logger {
    static log(...message) {
        if (debug) {
            console.log(...message)
        }
    }
    static warn(...message) {
        if (debug) {
            console.warn(...message)
        }
    }
    static error(...message) {
        if (debug) {
            console.error(...message)
        }
    }
}

