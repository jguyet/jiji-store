/**
 *  Jiji Framework Store 2021
 *  Author : Jeremy Guyet
 *  Version : 0.0.1
 */
 const JijiStore = {
    _store: {},
    initialize: (m) => {
        JijiStore._store = {};
        for (const [key, initialValue] of Object.entries(m)) {
            JijiStore._store[key] = { value: initialValue, callbacks: {} };
        }
    },
    _callbacksCounter: 0,
    _addCallBack: (key, callback) => { // internal function, dont check if key exists
        JijiStore._store[key].callbacks[JijiStore._callbacksCounter++] = callback;
    },
    exists: (key) => {
        return JijiStore._store[key] !== undefined;
    },
    get: (key) => {
        return JijiStore._store[key].value;
    },
    selectAsync: (key, callback) => {
        JijiStore._addCallBack(key, callback);
    },
    dispatch: (key, value) => {
        JijiStore._store[key].value = value;
        for (const [currentKey, callback] of Object.entries(JijiStore._store[key].callbacks)) {
            callback(value);
        }
    },
    setMap: (m) => {
        JijiStore.initialize(m);
    },
    toMap: () => {
        let m = {};
        for (const [key, storeElement] of Object.entries(JijiStore._store)) {
            m[key] = storeElement.value;
        }
        return m;
    }
};

// only before browserify with nodejs
if (typeof(module) !== 'undefined') {
	module.exports = JijiStore;
}
// [exports] JijiStore to GUI
if (typeof(document) !== 'undefined') {
    document.JijiStore = JijiStore;
}
if (typeof(window) !== "undefined") {
    window.JijiStore = JijiStore;
}