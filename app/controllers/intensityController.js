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
            res.status(200).json(intensities);
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
            res.status(200).json(intensity);
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
        try {
            if(!req.body.type || req.body.type.length < 5) {
                return res.status(400).json(`Merci de renseigner un type valide`);
            }

            // check if intensity already exists 
            const intensity = await Intensity.findOneByType(req.body.type);
            if(intensity.id) {
                return res.status(400).json(`L'intensité ${intensity.type} existe déjà sous l'id ${intensity.id}`);
            }

            const newIntensity = new Intensity(req.body);
            await newIntensity.insert();
            res.status(201).json(newIntensity);
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
            id: req.params.id, // intensity to modify
            type: req.body.type // data input
        };

        try { 
            // there is just one parameter to change (type), so if there is no data we can't modify the intensity
            if(!data.type && data.type.length < 5) {
                return res.status(400).json(`Merci de renseigner un type valide`);
            }

            // check if intensity already exists 
            const intensity = await Intensity.findOneByType(data.type);
            if(intensity.id) {
                return res.status(400).json(`L'intensité ${intensity.type} existe déjà sous l'id ${intensity.id}`);
            }

            const updatedIntensity = new Intensity(data);
            await updatedIntensity.update();
            res.statusjson(updatedIntensity); 
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
            res.status(203).json({ 
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