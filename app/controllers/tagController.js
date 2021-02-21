const Tag = require('../models/tag');

/**
 * A controller in charge of all tag middleware functions
 */
const tagController = {

    /**
     * Middleware function displays all the tags
     * @module allTags
     * @function async
     * @param {Express.Request} [request] - the object representing the request
     * @param {Express.Response} response - the object representing the response
     * @returns {JSON[]} - tags found
    */
    allTags: async (_, res) => {
        try {
            const tags = await Tag.findAll();
            res.json(tags);   
        }
        catch(error) {
            res.status(404).json(error.message);
        }
    },

    /**
     * Middleware function diplays one tag (according to the given id in request param) and the associated perfumes
     * @module oneTag
     * @function async
     * @param {Express.Request} [request] - the object representing the request
     * @param {Express.Response} response - the object representing the response
     * @returns {JSON[]} - the tag found
     */
    oneTag: async (req, res) => {
        const { id } = req.params;

        try {
            const tag = await Tag.findOne(id);
            res.json(tag);
        } 
        catch(error) {
            res.status(400).json(error.message);
        }
    },

};

module.exports = tagController;