const Joi = require("joi");

// pour les routes post, toutes les propriétés sont requises mais pas pour les routes patch
// création d'un schéma propre aux routes patch pour ne pas altérer les routes post
const variations = {
    patch: (schema) => schema.optional()
};

const perfumeSchema = Joi.object ({
    name: Joi.string().min(2).required().alter(variations),
    creator: Joi.string().min(5).required().alter(variations),
    yearOfCreation: Joi.date().less('now').required().alter(variations),
    score: Joi.number().integer().min(0).max(5).required().alter(variations),
    brandId: Joi.number().integer().positive().required().alter(variations),
    brand: Joi.string().min(2),
    intensityId: Joi.number().integer().positive().required().alter(variations),
    intensity: Joi.string().min(5),
    genderId: Joi.number().integer().positive().required().alter(variations),
    gender: Joi.string().min(5)
}).xor('brand', 'brandId').xor('intensity', 'intensityId').xor('gender', 'genderId');

const genderSchema = Joi.object({
    type: Joi.string().min(5).required()
});

const intensitySchema = Joi.object({
    type: Joi.string().min(5).required()
});

const tagSchema = Joi.object({
    label: Joi.string().min(2).required().alter(variations),
    color: Joi.string().pattern(/^#[a-fA-F0-9]{2}[a-fA-F0-9]{2}[a-fA-F0-9]{2}$/).alter(variations)
});

const scentSchema = Joi.object({
    note: Joi.string().min(2).required()
});

const perfumeScentSchema = Joi.object({
    perfumeId: Joi.number().integer().positive(),
    scentId: Joi.number().integer().positive().required()
});

const perfumeTagSchema = Joi.object({
    perfumeId: Joi.number().integer().positive(),
    tagId: Joi.number().integer().positive().required()
});


module.exports = {
    perfumeSchema,
    genderSchema,
    intensitySchema,
    tagSchema,
    scentSchema,
    perfumeScentSchema,
    perfumeTagSchema
}
