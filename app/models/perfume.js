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

    /**
     * findAll : A static and async method which returns all the perfumes from database
     * @returns {Perfume[]} returns an array of perfume instances (instead of gender / brand / intensity id, it returns the name of them + array of tags and scents) 
     */
    static async findAll() {
        const { rows } = await db.query('SELECT * FROM all_from_perfumes');

        if(!rows) {
            throw new Error(`Oups aucun parfum trouvé`)
        }
        return rows.map(perfume => new Perfume(perfume));
    }

    /**
     * findOne : A static and async method which returns the requested perfume and an array of the associated tags and scents
     * @param {Number} id - the perfume id (from the request)
     * @returns {Perfume} returns an instance of perfume (+ an array of associated tags and scents)
     */
    static async findOne(id) {
        const { rows } = await db.query('SELECT * FROM one_perfume($1)', [id]);
        
        if (!rows[0]) {
            throw new Error(`Oups, il n'y a pas de parfum dont l'id est ${id}`)
        }
        return new Perfume(rows[0]);
    }

};

module.exports = Perfume;