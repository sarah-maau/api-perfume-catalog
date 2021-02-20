const db = require('../database');

/**
  * Class representing an intensity
  * @name Intensity
  * @typedef {Intensity} Intensity
  * @property {string} type - the type of intensity
*/

class Intensity {
    id;
    type;

    /**
     * Creates an intensity
     * @param {Intensity} Intensity
    */
    constructor(data = {}) {
        for (const prop in data) {
            this[prop] = data[prop]
        }
    }

};

module.exports = Intensity;