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

    /**
     * findOne : A static and async method which returns the requested scent and an array of the associated perfumes' name
     * @param {Number} id - the scent id (from the request)
     * @returns {Scent} returns an instance of scent (+ an array of associated perfumes' name)
     */
    static async findOne(id){
        const { rows } = await db.query('SELECT * FROM one_scent($1)', [id]);
        
        if(!rows[0]) {
            throw new Error(`Oups il n'y a pas de parfum correspondant à la senteur ${id}`);
        }
        return new Scent(rows[0]);
    }

};

module.exports = Scent;