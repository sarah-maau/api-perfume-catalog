const db = require('../database');

/**
  * Class representing an association between a perfume and a scent
  * @name PerfumeHasScent
  * @typedef {PerfumeHasScent} PerfumeHasScent
  * @property {number} perfumeId - the id refers to the perfume
  * @property {number} scentId - the id refers to the scent
*/

class PerfumeHasScent {
    id;
    perfumeId;
    scentId;

    set perfume_id (val) {
        this.perfumeId = val;
    }

    set scent_id (val) {
        this.scentId = val;
    }

    /**
     * Creates an association between a perfume and a scent
     * @param {PerfumeHasScent} PerfumeHasScent
    */
    constructor (data = {}) {
        for (const prop in data) {
            this[prop] = data[prop]
        }
    }
};

module.exports = PerfumeHasScent;