const Gender = require ('../models/gender');

/**
 * A controller in charge of all gender middleware functions
 */
const genderController = {

    /**
     * Middleware function displays all the genders
     * @module allGenders
     * @function async
     * @param {Express.Request} [request] - the object representing the request
     * @param {Express.Response} response - the object representing the response
     * @returns {JSON[]} - genders found
     */
    allGenders: async (_, res) => {
        try {
            const genders = await Gender.findAll();
            res.status(200).json(genders);
        } 
        catch (error) {
            res.status(404).json(error.message);
        }
    },

    /**
     * Middleware function diplays one gender (according to the given id in request param) and the associated perfumes
     * @module oneGender
     * @function async
     * @param {Express.Request} [request] - the object representing the request
     * @param {Express.Response} response - the object representing the response
     * @returns {JSON[]} - the gender found
     */
    oneGender: async (req, res) => {
        const { id } = req.params;

        try {
            const gender = await Gender.findOne(id);
            res.status(200).json(gender);
        }
        catch (error) {
            res.status(404).json(error.message);
        }
    },

    /**
     * Middleware function adds one gender (according to the informations given in request body)
     * @module newGender
     * @function async
     * @param {Express.Request} [request] - the object representing the request
     * @param {Express.Response} response - the object representing the response
     * @returns {JSON[]} - the gender saved
     */
    newGender: async (req, res) => {
        try {
            if(!req.body.type || req.body.type.length < 5) {
                return res.status(400).json(`Merci de renseigner un type valide`);
            }

            // check if gender already exists 
            const gender = await Gender.findOneByType(req.body.type);
            if(gender.id) {
                return res.status(400).json(`Le genre ${gender.type} existe déjà sous l'id ${gender.id}`);
            }

            const newGender = new Gender(req.body);
            await newGender.insert();
            res.status(201).json(newGender);
        }
        catch (error) {
            res.status(403).json(error.message);
        }
    },

    /**
     * Middleware function modifies one gender (according to the given id in request param)
     * @module updateOneGender
     * @function async
     * @param {Express.Request} [request] - the object representing the request
     * @param {Express.Response} response - the object representing the response
     * @returns {JSON[]} - the gender modified
     */
    updateOneGender: async (req, res) => {
        const data = {
            id: req.params.id, // gender to modify
            type: req.body.type // data input
        };

        try {
            // there is just one parameter to change (type), so if there is no data we can't modify the gender
            if(!data.type && data.type.length < 5) {
                return res.status(400).json(`Merci de renseigner un type valide`);
            }
             // check if gender already exists 
            const gender = await Gender.findOneByType(data.type);
            if(gender.id) {
                return res.status(400).json(`Le genre ${gender.type} existe déjà sous l'id ${gender.id}`);
            }
            const updatedGender = new Gender(data);
            await updatedGender.update();
            res.status(201).json(updatedGender); 
        }
        catch (error) {
            res.status(403).json(error.message);
        }
    },

    /**
     * Middleware function deletes one gender (according to the given id in request param)
     * @module deleteOneGender
     * @function async
     * @param {Express.Request} [request] - the object representing the request
     * @param {Express.Response} response - the object representing the response
     * @returns {JSON[]} - success message
     */
    deleteOneGender: async (req, res) => {
        const { id } = req.params;
        
        try {
            const gender = await Gender.findOne(id);
            await gender.delete();
            res.status(203).json({ 
                ok: true,
                message: `Le genre ${id} a bien été supprimé`
            });
        } 
        catch(error) {
            res.status(403).json(error.message);
        }
    }

};

module.exports = genderController;