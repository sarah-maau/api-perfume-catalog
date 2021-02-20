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

};

module.exports = Tag;