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
            res.status(400).json(error.message);
        }
    },


};

module.exports = genderController;