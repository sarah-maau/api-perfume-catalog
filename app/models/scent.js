const db = require('../database');

/**
  * Class representing a scent
  * @name Scent
  * @typedef {Scent} Scent
  * @property {string} note - the scent's note 
*/

class Scent {
    id;
    note;

    /**
     * Creates a scent
     * @param {Scent} Scent
    */
    constructor (data = {}) {
        for (const prop in data) {
            this[prop] = data[prop]
        }
    }

};

module.exports = Scent;