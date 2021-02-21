const db = require('../database');

/**
  * Class representing a tag
  * @name Tag
  * @typedef {Tag} Tag
  * @property {string} label - the tag's label (name)
  * @property {string} color - the color of the label
*/
class Tag {
    id;
    label;
    color;
    
    /**
     * Creates a tag
     * @param {Tag} Tag
    */
    constructor (data = {}) {
        for (const prop in data) {
            this[prop] = data[prop]
        }
    }

    /**
     * findAll : A static and async method which returns all the tags from database
     * @returns {Tag[]} returns an array of tag instances
     */
    static async findAll() {
        const { rows } = await db.query('SELECT * FROM tag');
        
        if(!rows) {
            throw new Error(`Oups aucune categorie trouvée`);
        }
        return rows.map(tag => new Tag(tag));
    }

    /**
     * findOne : A static and async method which returns the requested tag and an array of the associated perfumes' name
     * @param {Number} id - the tag id (from the request)
     * @returns {Tag} returns an instance of tag (+ an array of associated perfumes' name)
     */
    static async findOne(id) {
        const { rows } = await db.query('SELECT * FROM one_tag($1)', [id]);
        
        if(!rows[0]) {
            throw new Error(`Oups il n'y a pas de parfum correspondant au tag ${id}`);
        }
        return new Tag(rows[0]);
    }

    /**
     * save : An async method which allows to save the new tag instance created
     */
    async save() {
        const { rows } = await db.query(`SELECT * FROM new_tag($1)`, [this]);
        this.id = rows[0].id;
    }

    /**
     * update : An async method which allows to modify an existing tag instance
     */
    async update() {
        const { rows } = await db.query(`SELECT * FROM update_tag($1, $2, $3)`, [this.id, this.label, this.color]);

        if (!rows[0]) {
            throw new Error(`Oups la modification du tag ${id} n'a pas pu être effectuée`);
        }
        return rows[0];
    }

};

module.exports = Tag;