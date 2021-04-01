const db = require('../database');

// Class representing an association between a perfume and a scent

/**
 * An association between a perfume and a scent
 * @typedef {PerfumeHasScent} PerfumeHasScent
 * @property {number} perfumeId - the id refers to the perfume
 * @property {number} scentId - the id refers to the scent
 */

class PerfumeHasScent {
    id;
    perfumeId;
    scentId;

    // GETTERS
    get id() {
        return this.id;
    }

    get perfumeId() {
        return this.perfumeId;
    }

    get scentId() {
        return this.scentId;
    }

    // SETTERS
    set id(val) {
        this.id = val;
    }

    set perfume_id(val) {
        this.perfumeId = val;
    }

    set scent_id(val) {
        this.scentId = val;
    }

    /**
     * Creates an association between a perfume and a scent
     * @param {Object} data
    */
    constructor (data = {}) {
        for (const prop in data) {
            this[prop] = data[prop]
        }
    }

    /**
     * findOne : A static and async method which returns the requested association between a perfume and a scent
     * @param {Number} perfumeId - the perfume id (from the request)
     * @param {Number} scentId - the scent id (from the request)
     * @returns {Gender} returns an instance of an association between the perfume and the scent
     */

    static async findOne (perfumeId, scentId) {
        const { rows } = await db.query('SELECT * FROM perfume_has_scent WHERE perfume_id=$1 AND scent_id=$2;', [perfumeId, scentId]);
        return new PerfumeHasScent(rows[0]);
    }

    /**
     * insert : An async method which allows to insert a new association instance between a perfume and a scent
     */
    async insert() {
        const { rows } = await db.query(`INSERT INTO perfume_has_scent(perfume_id, scent_id) VALUES ($1, $2) RETURNING *;`, [this.perfumeId, this.scentId]);
        this.id = rows[0].id;
    }

    /**
     * delete : An async method which allows to delete an association between a perfume and a scent 
     */
    async delete () {
        return await db.query('DELETE FROM perfume_has_scent WHERE perfume_id = $1 AND scent_id = $2;', [this.perfumeId, this.scentId]);
    }
};

module.exports = PerfumeHasScent;