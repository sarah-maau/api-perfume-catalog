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
            res.status(400).json(error.message);
        }
    },

};

module.exports = genderController;