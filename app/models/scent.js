const db = require('../database');

// Class representing a scent

/**
 * A scent
 * @typedef {Scent} Scent
 * @property {string} note - the scent's note 
 */

class Scent {
    id;
    note;

     // GETTERS
    get id() {
        return this.id;
    }

    get note() {
        return this.note;
    }

    // SETTERS
    set id(val) {
        this.id = val;
    }

    set note(val) {
        this.note = val;
    }

    /**
     * Creates a scent
     * @param {Object} data
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

    /**
     * save : An async method which allows to save the new scent instance created
     */
    async insert() {
        const { rows } = await db.query(`INSERT INTO scent(note) VALUES ($1) RETURNING *;`, [this.note]);
        this.id = rows[0].id;
    }

    /**
     * update : An async method which allows to modify an existing scent instance
     */
    async update() {
        const { rows } = await db.query(`SELECT * FROM update_scent($1, $2)`, [this.id, this.note]);

        if (!rows[0]) {
            throw new Error(`Oups la modification de la senteur ${id} n'a pas pu être effectuée`);
        }
        return rows[0];
    }

    /**
     * delete : An async method which allows to delete a scent instance
     */
    async delete () {
        return await db.query('DELETE FROM scent WHERE scent.id = $1', [this.id]);
    }

};

module.exports = Scent;