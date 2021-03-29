/**
 * @module genderRouter
 * @description This module provides routes for genders CRUD
 */
const { Router } = require('express');
const router = Router();

const genderController = require('../controllers/genderController');

// schémas de validation des données (joi)
const { genderSchema } = require('../services/schema');

// validateur des données (joi)
const { validateBody } = require('../services/validator');

// service de mise en cache
const cacheGenerator = require('../services/cache');
const { cache, flush } = cacheGenerator({
    ttl:10000,
    prefix: "perf"
});

router.route('/genders')
    /**
     * @route GET /genders
     * @group Genders - gender collection management
     * @summary Returns all the genders from database
     * @returns {JSON} 200 - all the genders from database
     */
    .get(cache, genderController.allGenders)
    /**
     * @route POST /genders
     * @group Genders - gender collection management
     * @summary Saves a new gender in database
     * @param {Gender.model} Gender.body.required
     * @returns {JSON} 200 - the gender created
     */
    .post(flush, validateBody(genderSchema), genderController.newGender);

router.route('/genders/:id(\\d+)')
    /**
     * @route GET /genders/{id}
     * @group Genders - gender collection management
     * @summary Returns one gender and its associated perfume names from database
     * @param {number} id.path.required - the gender's id to look for
     * @returns {JSON} 200 - one gender and its associated perfume names from database
     */
    .get(cache, genderController.oneGender)
    /**
     * @route PATCH /genders/{id}
     * @group Genders - gender collection management
     * @summary Modifies a gender according to its id in database
     * @param {number} id.path.required - the gender's id to modify
     * @param {Gender.model} Gender.body.required
     * @returns {JSON} 200 - the gender modified
     */
    .patch(flush, validateBody(genderSchema), genderController.updateOneGender)
    /**
     * @route DELETE /genders/{id}
     * @group Genders - gender collection management
     * @summary Deletes one gender from the database
     * @param {number} id.path.required - the gender's id to delete
     * @returns {JSON} 200 - success message
     */
    .delete(flush, genderController.deleteOneGender);

module.exports = router;