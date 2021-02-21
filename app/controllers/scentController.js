const Scent = require('../models/scent');
const PerfumeHasScent = require('../models/perfumeHasScent');

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
            res.status(404).json(error.message);
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
            res.status(404).json(error.message);
        }
    },

    /**
     * Middleware function adds one scent (according to the informations given in body request)
     * @module newScent
     * @function async
     * @param {Express.Request} [request] - the object representing the request
     * @param {Express.Response} response - the object representing the response
     * @returns {JSON[]} - the scent saved
     */
    newScent: async (req, res) => {
        const newScent = new Scent(req.body);
        
        try {
            await newScent.save();
            res.json(newScent);
        }
        catch (error) {
            res.status(403).json(error.message);
        }
    },

    /**
     * Middleware function adds one association between a perfume (according to id in request param) and a scent (according to the informations given in body request)
     * @module newAssociation
     * @function async
     * @param {Express.Request} [request] - the object representing the request
     * @param {Express.Response} response - the object representing the response
     * @returns {JSON[]} - the new association perfume <-> scent created
     */
    newAssociation: async (req, res) => {  
        const data = {
            perfumeId: Number(req.params.id),
            scentId: req.body.scentId
        }
            
        const newAssociation = new PerfumeHasScent(data);

        try {
            await newAssociation.save();
            res.json(newAssociation);
        }
        catch (error) {
            res.status(403).json(error.message);
        }
    },

    /**
     * Middleware function modifies one scent (according to the informations given in body and params request)
     * @module updateOneScent
     * @function async
     * @param {Express.Request} [request] - the object representing the request
     * @param {Express.Response} response - the object representing the response
     * @returns {JSON[]} - the scent modified
     */
    updateOneScent: async (req, res) => {
        const data = {
            id: req.params.id, // la scent à modifier
            note: req.body.note // l'info donnée (seulement la note)
        };

        try { 
            const updatedScent = new Scent(data);
            await updatedScent.update();
            res.json(updatedScent); 
        }
        catch (error) {
            res.status(403).json(error.message);
        }
    },

};

module.exports = scentController;