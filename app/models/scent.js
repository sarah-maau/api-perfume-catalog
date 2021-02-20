const db = require('../database');

/**
  * Class representing a scent
  * @name Scent
  * @typedef {Scent} Scent
  * @property {string} note - the scent's note 
*/
class Scent {
    id;
    note;

    /**
     * Creates a scent
     * @param {Scent} Scent
    */
    constructor (data = {}) {
        for (const prop in data) {
            this[prop] = data[prop]
        }
    }

    /**
     * findAll : A static and async method which returns all the scents from database
     * @returns {Scent[]} returns an array of scents instances 
     */
    static async findAll(){
        const { rows } = await db.query('SELECT * FROM scent');
        
        if(!rows) {
            throw new Error(`Oups aucune senteur trouvée`)
        }
        return rows.map(scent => new Scent(scent));
    }

};

module.exports = Scent;