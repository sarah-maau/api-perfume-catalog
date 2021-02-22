const db = require('../database');

// Class representing an association between a perfume and a tag

/**
 * An association between a perfume and a tag
 * @typedef {PerfumeHasTag} PerfumeHasTag
 * @property {number} perfumeId - the id refers to the perfume
 * @property {number} tagId - the id refers to the tag
 */

class PerfumeHasTag {
    id;
    perfumeId;
    tagId;

    set perfume_id (val) {
        this.perfumeId = val;
    }

    set tag_id (val) {
        this.tagId = val;
    }

    /**
     * Creates an association between a perfume and a tag
     * @param {Object} data
    */
    constructor (data = {}) {
        for (const prop in data) {
            this[prop] = data[prop]
        }
    }

    /**
     * findOne : A static and async method which returns the requested association between a perfume and a tag
     * @param {Number} perfumeId - the perfume id (from the request)
     * @param {Number} tagId - the tag id (from the request)
     * @returns {Gender} returns an instance of an association between the perfume and the tag
     */
    static async findOne(perfumeId, tagId) {
        const { rows } = await db.query('SELECT * from perfume_has_tag WHERE perfume_id = $1 AND tag_id = $2;', [perfumeId, tagId]);
        if (!rows[0]) {
            throw new Error(`Oups, il n'y a pas d'association entre le parfum ${perfumeId} et le tag ${tagId}`);
        }
        return new PerfumeHasTag(rows[0]);
    }

    /**
     * save : An async method which allows to save the new association instance between a perfume and a tag
     */
    async save() {
        const { rows } = await db.query(`INSERT INTO perfume_has_tag(perfume_id, tag_id) VALUES ($1, $2) RETURNING *;`, [this.perfumeId, this.tagId]);
        this.id = rows[0].id;
    }

    /**
     * delete : An async method which allows to delete an association between a perfume and a tag 
     */
    async delete () {
        return await db.query('DELETE FROM perfume_has_tag WHERE perfume_id = $1 AND tag_id = $2;', [this.perfumeId, this.tagId]);
    }

};

module.exports = PerfumeHasTag;