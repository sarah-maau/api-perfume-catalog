const db = require('../database');

/**
  * Class representing an intensity
  * @name Intensity
  * @typedef {Intensity} Intensity
  * @property {string} type - the type of intensity
*/
class Intensity {
    id;
    type;

    /**
     * Creates an intensity
     * @param {Intensity} Intensity
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
        const { rows } = await db.query('SELECT * FROM intensity');

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
        const { rows } = await db.query('SELECT * FROM one_intensity($1)', [id]);

        if(!rows [0]) {
            throw new Error(`Oups il n'y a pas de parfum correspondant au type de concentration ${id}`);
        }
        return new Intensity(rows[0]);
    }

    /**
     * save : An async method which allows to save the new intensity instance created
     */
    async save() {
        const { rows } = await db.query('INSERT INTO intensity(type) VALUES ($1) RETURNING *;', [this.type]);
        this.id = rows[0].id;
    }

};

module.exports = Intensity;