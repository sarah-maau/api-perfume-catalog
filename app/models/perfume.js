const db = require('../database');

// Class representing a perfume

/**
 * A perfume
 * @typedef {Perfume} Perfume
 * @property {string} name - the perfume's name - ex: "Bleu" 
 * @property {string} creator - the creator's fullname - ex: "Jacques Polge"
 * @property {string} yearOfCreation - the date of creation - ex: "2010-01-01"
 * @property {number} score - the average score - ex: 5
 * @property {number} brandId - the id refers to the brand - ex: 1 (for Chanel)
 * @property {number} intensityId - the id refers to the intensity (concentration) - ex: 3 (for Eau de toilette)
 * @property {number} genderId - the id refers to the gender - ex: 2 (for Femme)
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

    // GETTERS
    get id() {
        return this.id;
    }

    get name() {
        return this.name;
    }

    get creator() {
        return this.creator;
    }

    get yearOfCreation() {
        return this.yearOfCreation;
    }

    get score() {
        return this.score;
    }

    get brandId() {
        return this.brandId;
    }

    get intensityId() {
        return this.intensityId;
    }

    get genderId() {
        return this.genderId;
    }

    // SETTERS
    set id(val) {
        this.id = val;
    }

    set name(val) {
        this.name = val;
    }

    set creator(val) {
        this.creator = val;
    }

    set year_of_creation(val) {
        this.yearOfCreation = val;
    }

    set score(val) {
        this.score = val;
    }

    set brand_id(val) {
        this.brandId = val;
    }

    set intensity_id(val) {
        this.intensityId = val;
    }

    set gender_id(val) {
        this.genderId = val;
    }

    /**
     * Creates a perfume
     * @param {Object} data
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
        const { rows } = await db.query('SELECT * FROM all_from_perfumes;');

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
        const { rows } = await db.query('SELECT * FROM one_perfume($1);', [id]);
        
        if (!rows[0]) {
            throw new Error(`Oups, il n'y a pas de parfum dont l'id est ${id}`)
        }
        return new Perfume(rows[0]);
    }

    /**
     * findOneByName : A static and async method which returns the requested perfume thanks to its name
     * @param {Text} name - the perfume name (from the request)
     * @returns {Perfume} returns an instance of perfume 
     */
    static async findOneByName(name) {
        const { rows } = await db.query('SELECT * FROM perfume WHERE name =$1;', [name]);
        return new Perfume(rows[0]);
    }

    /**
     * insert : An async method which allows to insert a new perfume instance 
     */
    async insert() {
        const { rows } = await db.query(`SELECT * FROM new_perfume($1);`, [this]); 
        this.id = rows[0].id;
    }

    /**
     * update : An async method which allows to modify an existing perfume instance
     */
    async update() {
        const { rows } = await db.query(`SELECT * FROM update_perfume ($1, $2, $3, $4, $5, $6, $7, $8);`, [this.id, this.name, this.creator, this.yearOfCreation, this.score, this.brandId, this.intensityId, this.genderId]);
        
        if(!rows[0]) {
            throw new Error(`Oups la modification du parfum ${id} n'a pas pu être effectuée`);
        }
        return rows[0];
    }

    /**
     * delete : An async method which allows to delete an intensity instance
     */
    async delete() {
        return await db.query('DELETE FROM perfume WHERE perfume.id = $1;', [this.id]);
    }

};

module.exports = Perfume;