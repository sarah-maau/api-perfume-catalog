const Intensity = require('../models/intensity');

/**
 * A controller in charge of all intensity middleware functions
 */
const intensityController = {
    
    /**
     * Middleware function displays all the intensities
     * @module allIntensities
     * @function async
     * @param {Express.Request} [request] - the object representing the request
     * @param {Express.Response} response - the object representing the response
     * @returns {JSON[]} - intensities found
    */
    allIntensities: async (_, res) => {
        try {
            const intensities = await Intensity.findAll();
            res.json(intensities);
        }
        catch (error) {
            res.status(400).json(error.message);
        }
    }

};

module.exports = intensityController;