const db = require('../database');

class Scent {
    id;
    note;

    constructor (data = {}) {
        for (const prop in data) {
            this[prop] = data[prop]
        }
    }

};

module.exports = Scent;