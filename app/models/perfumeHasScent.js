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
     * findOne : A static and async method which returns the requested association between a perfume and a scent
     * @param {Number} perfumeId - the perfume id (from the request)
     * @param {Number} scentId - the scent id (from the request)
     * @returns {Gender} returns an instance of an association between the perfume and the scent
     */

    static async findOne (perfumeId, scentId) {
        const { rows } = await db.query('SELECT * FROM perfume_has_scent WHERE perfume_id = $1 AND scent_id = $2;', [perfumeId, scentId]);

        if (!rows[0]) {
            throw new Error (`Oups, il n'y a pas d'association entre le parfum ${perfumeId} et le tag ${scentId}`);
        }
        return new PerfumeHasScent(rows[0]);
    }

    /**
     * save : An async method which allows to save the new association instance between a perfume and a scent
     */
    async save() {
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