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
            res.status(200).json(scents)
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
            res.status(200).json(scent);
        }
        catch (error) {
            res.status(404).json(error.message);
        }
    },

    /**
     * Middleware function adds one scent (according to the informations given in request body)
     * @module newScent
     * @function async
     * @param {Express.Request} [request] - the object representing the request
     * @param {Express.Response} response - the object representing the response
     * @returns {JSON[]} - the scent saved
     */
    newScent: async (req, res) => {
        
        try {
            if(!req.body.note || req.body.note.length < 2) {
                return res.status(403).json(`Merci de renseigner une note valide`);
            }

            // check if note already exists 
            const scent = await Scent.findOneByNote(req.body.note);
            if(scent.id) {
                return res.status(403).json(`La note ${scent.note} existe déjà sous l'id ${scent.id}`);
            }

            const newScent = new Scent(req.body);
            await newScent.insert();
            res.status(201).json(newScent);
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
        };

        try {
            // check if the association already exists 
            const association = await PerfumeHasScent.findOne(data.perfumeId, data.scentId);
            if(association.id) {
                return res.status(403).json(`L'association entre le parfum n°${association.perfumeId} et la senteur n°${association.scentId} existe déjà`)
            }

            const newAssociation = new PerfumeHasScent(data);
            await newAssociation.insert();
            res.status(201).json(newAssociation);
        }
        catch (error) {
            res.status(403).json(error.message);
        }
    },

    /**
     * Middleware function modifies one scent (according to the informations given in request body and request param)
     * @module updateOneScent
     * @function async
     * @param {Express.Request} [request] - the object representing the request
     * @param {Express.Response} response - the object representing the response
     * @returns {JSON[]} - the scent modified
     */
    updateOneScent: async (req, res) => {
        const data = {
            id: req.params.id, // scent to modify
            note: req.body.note // data input
        };

        try { 
            // there is just one parameter to change (note), so if there is no data we can't modify the scent
            if(!data.note && data.note.length < 2) {
                return res.status(403).json(`Merci de renseigner une note valide`);
            }

            // check if note already exists 
            const scent = await Scent.findOneByType(data.note);
            if(scent.id) {
                return res.status(403).json(`La note ${scent.note} existe déjà sous l'id ${scent.id}`);
            }
            const updatedScent = new Scent(data);
            await updatedScent.update();
            res.status(201).json(updatedScent); 
        }
        catch (error) {
            res.status(403).json(error.message);
        }
    },

    /**
     * Middleware function deletes one scent (according to the given id in request param)
     * @module deleteOneScent
     * @function async
     * @param {Express.Request} [request] - the object representing the request
     * @param {Express.Response} response - the object representing the response
     * @returns {JSON[]} - success message
     */
    deleteOneScent: async (req, res) => {
        const { id } = req.params;

        try {
            const scent = await Scent.findOne(id);
            await scent.delete();
            res.status(201).json({ 
                ok: true,
                message: `La senteur ${id} a bien été supprimée`
            });
        } 
        catch(error) {
            res.status(403).json(error.message);
        }
    },

    /**
     * Middleware function deletes one association between a perfume and a scent (according to given ids request param)
     * @module removeAssociation
     * @function async
     * @param {Express.Request} [request] - the object representing the request
     * @param {Express.Response} response - the object representing the response
     * @returns {JSON[]} - success message
     */
    removeAssociation: async (req, res) => {
        const { perfumeId, scentId } = req.params;

        try {
            const scent = await PerfumeHasScent.findOne(perfumeId, scentId);
            await scent.delete();
            res.status(201).json({ 
                ok: true,
                message: `L'association entre le parfum ${perfumeId} et la senteur ${scentId} a bien été supprimée`
            });
        } 
        catch(error) {
            res.status(403).json(error.message);
        }
    },


};

module.exports = scentController;