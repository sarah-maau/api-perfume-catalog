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


};

module.exports = Intensity;