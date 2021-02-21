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
    },

    /**
     * Middleware function diplays one intensity (according to the given id in request param) and the associated perfumes
     * @module oneScent
     * @function async
     * @param {Express.Request} [request] - the object representing the request
     * @param {Express.Response} response - the object representing the response
     * @returns {JSON[]} - the intensity found
     */
    oneIntensity: async (req, res) => {
        const { id } = req.params;

        try {
            const intensity = await Intensity.findOne(id);
            res.json(intensity);
        }
        catch (error) {
            res.status(400).json(error.message);
        }
    },


};

module.exports = intensityController;