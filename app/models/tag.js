const db = require('../database');

class Tag {
    id;
    label;
    color;

    constructor (data = {}) {
        for (const prop in data) {
            this[prop] = data[prop]
        }
    }

};

module.exports = Tag;