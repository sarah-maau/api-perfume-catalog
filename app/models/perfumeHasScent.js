const db = require('../database');

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

    constructor (data = {}) {
        for (const prop in data) {
            this[prop] = data[prop]
        }
    }
};

module.exports = PerfumeHasScent;