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
            res.status(404).json(error.message);
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
            res.status(404).json(error.message);
        }
    },

    /**
     * Middleware function adds one intensity (according to the informations given in request body)
     * @module newIntensity
     * @function async
     * @param {Express.Request} [request] - the object representing the request
     * @param {Express.Response} response - the object representing the response
     * @returns {JSON[]} - the intensity saved
     */
    newIntensity: async (req, res) => {
        const newIntensity = new Intensity(req.body);

        try {
            await newIntensity.insert();
            res.json(newIntensity);
        }
        catch (error) {
            res.status(403).json(error.message);
        }
    },

    /**
     * Middleware function modifies one intensity (according to the informations given in request body and request param)
     * @module updateOneIntensity
     * @function async
     * @param {Express.Request} [request] - the object representing the request
     * @param {Express.Response} response - the object representing the response
     * @returns {JSON[]} - the intensity modified
     */
    updateOneIntensity: async (req, res) => {
        const data = {
            id: req.params.id, // l'intensité à modifier 
            type: req.body.type // l'info donnée (seulement le type)
        };

        try { 
            const updatedIntensity = new Intensity(data);
            await updatedIntensity.update();
            res.json(updatedIntensity); 
        }
        catch (error) {
            res.status(403).json(error.message);
        }
    },

    /**
     * Middleware function deletes one intensity (according to the given id in request param)
     * @module deleteOneIntensity
     * @function async
     * @param {Express.Request} [request] - the object representing the request
     * @param {Express.Response} response - the object representing the response
     * @returns {JSON[]} - success message
     */
    deleteOneIntensity: async (req, res) => {
        const { id } = req.params;

        try {
            const intensity = await Intensity.findOne(id);
            
            await intensity.delete();
            res.json({ 
                ok: true,
                message: `La concentration ${id} a bien été supprimée`
            });
        } 
        catch(error) {
            res.status(403).json(error.message);
        }
    }

};

module.exports = intensityController;