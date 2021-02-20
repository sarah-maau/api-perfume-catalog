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
    }

};

module.exports = tagController;