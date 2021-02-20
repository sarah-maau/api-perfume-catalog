const Scent = require('../models/scent');

/**
 * A controller in charge of all scent middleware functions
 */
const scentController = {

    /**
     * Middleware function displays all the scents
     * @module allScents
     * @function async
     * @param {Express.Request} [request] - the object representing the request
     * @param {Express.Response} response - the object representing the response
     * @returns {JSON[]} - scents found
    */
    allScents: async (_, res) => {
        try {
            const scents = await Scent.findAll();
            res.json(scents)
        }
        catch (error) {
            res.status(400).json(error.message);
        }
    }

};

module.exports = scentController;