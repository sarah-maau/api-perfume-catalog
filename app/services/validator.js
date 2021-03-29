/**
 * Validates the request's payload from a schema passed as an argument
 * @param {Joi.schema} schema 
 * @returns {Function} Express middleware ready to use
 */
const validateBody = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).json(error.message);
    } else {
        next();
    }
};

/**
 * Validates the request's payload from a schema passed as an argument
 * @param {Joi.schema} schema 
 * @returns {Function} Express middleware ready to use
 */
const validateQuery = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.query);
    if (error) {
        res.status(400).json(error.message);
    } else {
        next();
    }
};

module.exports = {
    validateBody,
    validateQuery
};