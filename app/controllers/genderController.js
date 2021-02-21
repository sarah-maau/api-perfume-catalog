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
            res.json(genders);
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
            res.json(gender);
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
        const newGender = new Gender(req.body);

        try {
            await newGender.save();
            res.json(newGender);
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
            id: req.params.id, // le gender à modifier
            type: req.body.type // les infos données
        };

        try {
            const updatedGender = new Gender(data)
            await updatedGender.update();
            res.json(updatedGender); 
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
            res.json({ 
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