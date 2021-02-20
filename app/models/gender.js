const db = require('../database');

/**
  * Class representing a gender
  * @name Gender
  * @typedef {Gender} Gender
  * @property {string} type - the gender's type
*/
class Gender {
    id;
    type;

    /**
     * Creates a gender
     * @param {Gender} Gender
    */
    constructor(data = {}) {
        for (const prop in data) {
            this[prop] = data[prop]
        }
    }

    /**
     * findAll : A static and async method which returns all the genders from database
     * @returns {Gender[]} returns an array of gender instances
     */
    static async findAll() {
        const { rows } = await db.query('SELECT * FROM gender');
        
        if(!rows) {
            throw new Error(`Oups aucun genre trouvé`);
        }
        return rows.map(gender => new Gender(gender));
    }

};

module.exports = Gender;