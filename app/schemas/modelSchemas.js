const Joi = require("joi");

// pour les routes post, toutes les propriétés sont requises mais pas pour les routes patch
// création d'un schéma propre aux routes patch pour ne pas altérer les routes post
/**
  *  @const {Object} variations - makes the parameters optional for PATCH route  
  *  @function patch
  *  @param {object} schema - schema is now optional
 */
const variations = {
    patch: (schema) => schema.optional()
};

/**
 * Perfume schema which follow tables' constraints
 * @const {Joi.object} schema - data validation schema
 * @property {string} name - the perfume's name : 2 characters min., required for the POST route
 * @property {string} creator - the creator's fullname : 5 characters min., required for the POST route
 * @property {string} yearOfCreation - the perfume's year of creation : can't be later than today, required for the POST route
 * @property {number} score - the average score of the perfume between 0 and 5, required for the POST route
 * @property {number} brandId - the perfume's brandId, positive integer, min. 1, required for the POST route
 * @property {number} intensityId - the perfume's intensityId, positive integer, min. 1, required for the POST route
 * @property {number} genderID - the perfume's genderId, positive integer, min. 1, required for the POST route
 */

const perfumeSchema = Joi.object ({
    name: Joi.string().min(2).required().alter(variations),
    creator: Joi.string().min(5).required().alter(variations),
    yearOfCreation: Joi.date().less('now').required().alter(variations),
    score: Joi.number().integer().min(0).max(5).required().alter(variations),
    brandId: Joi.number().integer().positive().min(1).required().alter(variations),
    intensityId: Joi.number().integer().positive().min(1).required().alter(variations),
    genderId: Joi.number().integer().positive().min(1).required().alter(variations),
});

/**
 * Gender schema which follow tables' constraints
 * @const {Joi.object} schema - data validation schema
 * @property {string} type - the gender's type : 5 characters min., required for the POST route
 */
const genderSchema = Joi.object({
    type: Joi.string().min(5).required()
});

/**
 * Intensity schema which follow tables' constraints
 * @const {Joi.object} schema - data validation schema
 * @property {string} type - the intensity's type : 5 characters min., required for the POST route
 */
const intensitySchema = Joi.object({
    type: Joi.string().min(5).required()
});

/**
 * Tag schema which follow tables' constraints
 * @const {Joi.object} schema - data validation schema
 * @property {string} label - the label's tag : 2 characters min., required for the POST route
 * @property {string} color - the color's tag : hexadecimal format (regex), if no color provided, #ff00ff is defined by default
 */
const tagSchema = Joi.object({
    label: Joi.string().min(2).required().alter(variations),
    color: Joi.string().pattern(/^#[a-fA-F0-9]{2}[a-fA-F0-9]{2}[a-fA-F0-9]{2}$/).alter(variations)
});

/**
 * Scent schema which follow tables' constraints
 * @const {Joi.object} schema - data validation schema
 * @property {string} node - the scent's note : 2 characters min., required for the POST route
 */
const scentSchema = Joi.object({
    note: Joi.string().min(2).required()
});

/**
 * PerfumeHasScent schema which follow tables' constraints
 * @const {Joi.object} schema - data validation schema
 * @property {number} perfumeId - the perfume's id, positive integer, min. 1
 * @property {number} scentId - the scent's id : positive integer, min. 1 required for the POST route
 */
const perfumeScentSchema = Joi.object({
    perfumeId: Joi.number().integer().positive().min(1),
    scentId: Joi.number().integer().positive().min(1).required()
});

/**
 * PerfumeHasTag schema which follow tables' constraints
 * @const {Joi.object} schema - data validation schema
 * @property {number} perfumeId - the perfume's id, positive integer, min. 1
 * @property {number} scentId - the tag's id : positive integer, min. 1 required for the POST route
 */
const perfumeTagSchema = Joi.object({
    perfumeId: Joi.number().integer().positive().min(1),
    tagId: Joi.number().integer().positive().min(1).required()
});


module.exports = {
    perfumeSchema,
    genderSchema,
    intensitySchema,
    tagSchema,
    scentSchema,
    perfumeScentSchema,
    perfumeTagSchema
};
