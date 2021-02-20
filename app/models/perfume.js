const db = require('../database');

/**
  * Class representing a perfume
  * @name Perfume
  * @typedef {Perfume} Perfume
  * @property {string} name - the perfume's name
  * @property {string} creator - the creator's fullname
  * @property {date} yearOfCreation - the date of creation 
  * @property {number} score - the average score 
  * @property {number} brandId - the id refers to the brand
  * @property {number} intensityId - the id refers to the intensity (concentration)
  * @property {number} genderId - the id refers to the gender
*/

class Perfume {

    id;
    name;
    creator;
    yearOfCreation;
    score;
    brandId;
    intensityId;
    genderId;

    set year_of_creation (val) {
        this.yearOfCreation = val;
    }

    set brand_id (val) {
        this.brandId = val;
    }

    set intensity_id (val) {
        this.intensityId = val;
    }

    set gender_id (val) {
        this.genderId = val;
    }

    /**
     * Creates a perfume
     * @param {Perfume} Perfume
    */
    constructor (data = {}) {
        for (const prop in data) {
            this[prop] = data[prop]
        }
    }

};

module.exports = Perfume;