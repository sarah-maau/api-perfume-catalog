const db = require('../database');

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

    constructor (data = {}) {
        for (const prop in data) {
            this[prop] = data[prop]
        }
    }

};

module.exports = PerfumeHasTag;