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
    },

    /**
     * Middleware function diplays one perfume (according to the given id in request param)
     * @module onePerfume
     * @function async
     * @param {Express.Request} [request] - the object representing the request
     * @param {Express.Response} response - the object representing the response
     * @returns {JSON[]} - the perfume found
     */
    onePerfume: async (req, res) => {
        const { id } = req.params;
        
        try {
            const perfume = await Perfume.findOne(id);
            res.json(perfume);
        }
        catch(error) {
            res.status(404).json(error.message);
        }
    },

    /**
     * Middleware function adds one perfume (according to the informations given in body request)
     * @module newPerfume
     * @function async
     * @param {Express.Request} [request] - the object representing the request
     * @param {Express.Response} response - the object representing the response
     * @returns {JSON[]} - the perfume saved
     */
    newPerfume: async (req, res) => {
        const newPerfume = new Perfume(req.body);

        try {
            await newPerfume.save();
            res.json(newPerfume);
        }
        catch (error) {
            res.status(403).json(error.message);
        }
    },

    /**
     * Middleware function modifies one perfume (according to the informations given in body and params request)
     * @module updateOnePerfume
     * @function async
     * @param {Express.Request} [request] - the object representing the request
     * @param {Express.Response} response - the object representing the response
     * @returns {JSON[]} - the perfume modified
     */
    updateOnePerfume: async (req, res) => {
        const { id } = req.params; // le perfume à modifier
        const data = req.body; // les infos données

        try {      
            const perfumeToUpdate = await Perfume.findOne(id);

            for (const field in data) {
                perfumeToUpdate[field] = data[field];
            }

            const updatedPerfume = new Perfume(perfumeToUpdate);
            await updatedPerfume.update();
            res.json(updatedPerfume); 
        }
        catch (error) {
            res.status(400).json(error.message);
        }
    },

};

module.exports = perfumeController;