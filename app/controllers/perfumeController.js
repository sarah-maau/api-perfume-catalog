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
            res.status(200).json(perfumes);
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
            res.status(200).json(perfume);
        }
        catch(error) {
            res.status(404).json(error.message);
        }
    },

    /**
     * Middleware function adds one perfume (according to the informations given in request body)
     * @module newPerfume
     * @function async
     * @param {Express.Request} [request] - the object representing the request
     * @param {Express.Response} response - the object representing the response
     * @returns {JSON[]} - the perfume saved
     */
    newPerfume: async (req, res) => {
        const now = Date.now();
        const yearOfCreation = new Date(req.body.yearOfCreation);

        try {
            if(!req.body.name || req.body.name.length < 2 ) {
                return res.status(400).json(`Merci de renseigner un nom de parfum valide`);
            }
            if(!req.body.creator || req.body.creator.length < 5 ) {
                return res.status(400).json(`Merci de renseigner un nom de créateur valide`);
            }
            if(yearOfCreation > now) {
                return res.status(400).json(`Le parfum ne peut avoir été créé après aujourd'hui !`);
            }
            if(!req.body.brandId) {
                return res.status(400).json(`Le parfum doit avoir une marque`);
            }
            if(!req.body.intensityId) {
                return res.status(400).json(`Le parfum doit avoir une intensité`);
            }
            if(!req.body.genderId) {
                return res.status(400).json(`Le parfum doit avoir un genre`);
            }

            // check if perfume already exists
            const perfume = await Perfume.findOneByName(req.body.name);
            if (perfume.id) {
                return res.status(400).json(`Le parfum parfum ${perfume.name} existe déjà`);
            }

            const newPerfume = new Perfume(req.body);
            await newPerfume.insert();
            res.status(201).json(newPerfume);
        }
        catch (error) {
            res.status(403).json(error.message);
        }
    },

    /**
     * Middleware function modifies one perfume (according to the informations given in request body and request param)
     * @module updateOnePerfume
     * @function async
     * @param {Express.Request} [request] - the object representing the request
     * @param {Express.Response} response - the object representing the response
     * @returns {JSON[]} - the perfume modified
     */
    updateOnePerfume: async (req, res, next) => {
        const { id } = req.params; // perfume to modify
        const data = req.body; // data input
        const now = Date.now();
        const yearOfCreation = new Date(data.yearOfCreation, 0);

        try {      
            let perfume = await Perfume.findOne(id);

            // check data input
            if(data.name && data.name.length < 2 ) {
                return res.status(400).json(`Merci de renseigner un nom de parfum valide`);
            }
            if(data.creator && data.creator.length < 5 ) {
                return res.status(400).json(`Merci de renseigner un nom de créateur valide`);
            }
            if(yearOfCreation > now) {
                return res.status(400).json(`Le parfum ne peut avoir été créé après aujourd'hui !`);
            }
            for (const field in data) {
                if(typeof perfume[field] !== undefined) {
                    perfume[field] = data[field]
                }
            }
            
            if (perfume === undefined) {
                next(); 
            }
            else {
                // merge "old" data with new one(s)
                perfume = {...perfume, ...data};
                const updatedPerfume = new Perfume(perfume);
                await updatedPerfume.update();
                res.status(201).json(updatedPerfume);
            }
        }
        catch (error) {
            console.trace(error);
            res.status(400).json(error.message);
        }
    },

    /**
     * Middleware function deletes one perfume (according to the given id in request params)
     * @module deleteOnePerfume
     * @function async
     * @param {Express.Request} [request] - the object representing the request
     * @param {Express.Response} response - the object representing the response
     * @returns {JSON[]} - success message
     */
    deleteOnePerfume: async (req, res) => {
        const { id } = req.params;

        try {
            const perfume = await Perfume.findOne(id);
            await perfume.delete();
            res.status(203).json({ 
                ok: true,
                message: `${perfume.name} a bien été supprimé`
            });
        } 
        catch(error) {
            res.status(400).json(error.message);
        }
    }

};

module.exports = perfumeController;