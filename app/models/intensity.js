const db = require('../database');

// Class representing an intensity

/**
  * An intensity
  * @typedef {Intensity} Intensity
  * @property {string} type - the type of intensity - ex: "Extrait"
*/
class Intensity {
    id;
    type;

     // GETTERS
    get id() {
        return this.id;
    }

    get type() {
        return this.type;
    }

    // SETTERS
    set id(val) {
        this.id = val;
    }

    set type(val) {
        this.type = val;
    }
    
    /**
     * Creates an intensity
     * @param {Object} data
    */
    constructor(data = {}) {
        for (const prop in data) {
            this[prop] = data[prop]
        }
    }

    /**
     * findAll : A static and async method which returns all the intensities from database
     * @returns {Intensity[]} returns an array of gender instances
     */
    static async findAll() {
        const { rows } = await db.query('SELECT * FROM intensity;');

        if(!rows) {
            throw new Error(`Oups aucune concentration trouvée`);
        }
        return rows.map(intensity => new Intensity(intensity));
    }

    /**
     * findOne : A static and async method which returns the requested intensity and an array of the associated perfumes' name
     * @param {Number} id - the intensity id (from the request)
     * @returns {Intensity} returns an instance of intensity (+ an array of associated perfumes' name)
     */
    static async findOne(id) {
        const { rows } = await db.query('SELECT * FROM one_intensity($1);', [id]);

        if(!rows [0]) {
            throw new Error(`Oups il n'y a pas de parfum correspondant au type de concentration ${id}`);
        }
        return new Intensity(rows[0]);
    }

    /**
     * findOneByType : A static and async method which returns the requested intensity thanks to its type
     * @param {Text} type - the intensity type (from the request)
     * @returns {Intensity} returns an instance of intensity
     */
    static async findOneByType(type) {
        const { rows } = await db.query('SELECT * FROM intensity WHERE type=$1;', [type]);
        return new Intensity(rows[0]);
    }


    /**
     * insert : An async method which allows to insert a new intensity instance 
     */
    async insert() {
        const { rows } = await db.query('INSERT INTO intensity(type) VALUES ($1) RETURNING *;', [this.type]);
        this.id = rows[0].id;
    }

    /**
     * update : An async method which allows to modify an existing intensity instance
     */
    async update() {
        const { rows } = await db.query(`SELECT * FROM update_intensity($1, $2);`, [this.id, this.type]);

        if (!rows[0]) {
            throw new Error(`Oups la modification de la concentration ${id} n'a pas pu être effectuée`);
        }
        return rows[0];
    }

    /**
     * delete : An async method which allows to delete an intensity instance
     */
    async delete() {
        return await db.query('DELETE FROM gender WHERE gender.id=$1;', [this.id]);
    }

};

module.exports = Intensity;