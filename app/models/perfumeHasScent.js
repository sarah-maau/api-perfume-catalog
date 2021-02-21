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

    /**
     * save : An async method which allows to save the new association instance between a perfume and a scent
     */
    async save() {
        const { rows } = await db.query(`INSERT INTO perfume_has_scent(perfume_id, scent_id) VALUES ($1, $2) RETURNING *;`, [this.perfumeId, this.scentId]);
        this.id = rows[0].id;
    }
};

module.exports = PerfumeHasScent;