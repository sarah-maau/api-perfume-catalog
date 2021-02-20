const db = require('../database');

class Intensity {
    id;
    type;

    constructor(data = {}) {
        for (const prop in data) {
            this[prop] = data[prop]
        }
    }

};

module.exports = Intensity;