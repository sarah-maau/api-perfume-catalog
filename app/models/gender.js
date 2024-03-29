const db = require('../database');

// Class representing a gender

/**
 *  A gender
 *  @typedef {Gender} Gender
 *  @property {string} type - the gender's type - ex: "Unisexe" 
*/
class Gender {
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
     * Creates a gender
     * @param {Object} data
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
        const { rows } = await db.query('SELECT * FROM gender;');
        
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
        const { rows } = await db.query('SELECT * FROM one_gender($1);', [id]);
        
        if(!rows[0]) {
            throw new Error(`Oups il n'y a pas de parfum correspondant au genre ${id}`);
        }
        return new Gender(rows[0]);
    }

    /**
     * findOneByType : A static and async method which returns the requested gender thanks to its type
     * @param {Text} type - the gender type (from the request)
     * @returns {Gender} returns an instance of gender
     */
    static async findOneByType(type) {
        const { rows } = await db.query('SELECT * FROM gender WHERE type=$1;', [type]);
        return new Gender(rows[0]);
    }

    /**
     * insert : An async method which allows to insert a new gender instance
     */
    async insert() {
        const { rows } = await db.query('INSERT INTO gender(type) VALUES ($1) RETURNING *;', [this.type]);
        this.id = rows[0].id;
    }

    /**
     * update : An async method which allows to modify an existing gender instance
     */
    async update() {
        const { rows } = await db.query(`SELECT * FROM update_gender($1, $2);`, [this.id, this.type]);
        
        if (!rows[0]) {
            throw new Error(`Oups la modification du genre ${id} n'a pas pu être effectuée`);
        }
        return rows[0];
    }

    /**
     * delete : An async method which allows to delete a gender instance
     */
    async delete() {
        return await db.query('DELETE FROM gender WHERE gender.id=$1;', [this.id]);
    }

};

module.exports = Gender;