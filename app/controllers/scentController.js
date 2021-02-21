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
    },

    /**
     * Middleware function diplays one scent (according to the given id in request param) and the associated perfumes
     * @module oneScent
     * @function async
     * @param {Express.Request} [request] - the object representing the request
     * @param {Express.Response} response - the object representing the response
     * @returns {JSON[]} - the scent found
     */
    oneScent: async (req, res) => {
        const { id } = req.params;

        try {
            const scent = await Scent.findOne(id);
            res.json(scent);
        }
        catch (error) {
            res.status(400).json(error.message);
        }
    },

};

module.exports = scentController;