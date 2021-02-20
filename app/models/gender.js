const db = require('../database');

/**
  * Class representing a gender
  * @name Gender
  * @typedef {Gender} Gender
  * @property {string} type - the gender's type
*/

class Gender {
    id;
    type;

    /**
     * Creates a gender
     * @param {Gender} Gender
    */
    constructor(data = {}) {
        for (const prop in data) {
            this[prop] = data[prop]
        }
    }

};

module.exports = Gender;