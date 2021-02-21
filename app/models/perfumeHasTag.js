const db = require('../database');

/**
  * Class representing an association between a perfume and a tag
  * @name PerfumeHasTag
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
     * @param {PerfumeHasTag} PerfumeHasTag
    */
    constructor (data = {}) {
        for (const prop in data) {
            this[prop] = data[prop]
        }
    }

    /**
     * save : An async method which allows to save the new association instance between a perfume and a tag
     */
    async save() {
        const { rows } = await db.query(`INSERT INTO perfume_has_tag(perfume_id, tag_id) VALUES ($1, $2) RETURNING *;`, [this.perfumeId, this.tagId]);
        this.id = rows[0].id;
    }

};

module.exports = PerfumeHasTag;