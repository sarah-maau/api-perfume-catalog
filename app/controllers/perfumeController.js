const Perfume = require('../models/perfume');

/**
 * A controller in charge of all perfume middleware functions
 */
const perfumeController = {
    /**
     * Middleware function diplays all the perfumes
     * @module allPerfumes
     * @function async
     * @param {Express.Request} [request] - the object representing the request
     * @param {Express.Response} response - the object representing the response
     * @returns {JSON[]} - perfumes found
     */
    allPerfumes: async (_, res) => {
        try {
            const perfumes = await Perfume.findAll();
            res.json(perfumes);
        }
        catch(error){
            res.status(404).json(error.message);
        }
    }

};

module.exports = perfumeController;