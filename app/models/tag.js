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

};

module.exports = Tag;