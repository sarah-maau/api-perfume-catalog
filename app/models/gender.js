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

    /**
     * findOne : A static and async method which returns the requested gender and an array of the associated perfumes' name
     * @param {Number} id - the gender id (from the request)
     * @returns {Gender} returns an instance of gender (+ an array of associated perfumes' name)
     */
    static async findOne(id) {
        const { rows } = await db.query('SELECT * FROM one_gender($1)', [id]);
        
        if(!rows[0]) {
            throw new Error(`Oups il n'y a pas de parfum correspondant au genre ${id}`);
        }
        return new Gender(rows[0]);
    }

    /**
     * save : An async method which allows to save the new gender instance created
     */
    async save() {
        const { rows } = await db.query('INSERT INTO gender(type) VALUES ($1) RETURNING *;', [this.type]);
        this.id = rows[0].id;
    }

};

module.exports = Gender;