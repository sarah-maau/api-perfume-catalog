const db = require('../database');

class Gender {
    id;
    type;

    constructor(data = {}) {
        for (const prop in data) {
            this[prop] = data[prop]
        }
    }

};

module.exports = Gender;