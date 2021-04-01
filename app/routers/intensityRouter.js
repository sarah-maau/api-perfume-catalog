/**
 * @module intensityRouter
 * @description This module provides routes for intensities CRUD
 */
const { Router } = require('express');
const router = Router();

const intensityController = require('../controllers/intensityController');

// data validation schema (joi)
const { intensitySchema } = require('../services/schema');

// data validator (joi)
const { validateBody } = require('../services/validator');

// caching service
const cacheGenerator = require('../services/cache');
const { cache, flush } = cacheGenerator({
    ttl:10000,
    prefix: "perf"
});

router.route('/intensities')
    /**
     * @route GET /intensities
     * @group Intensities - intensity collection management
     * @summary Returns all the intensities from database
     * @returns {JSON} 200 - all the intensities from database
     */
    .get(cache, intensityController.allIntensities)
    /**
     * @route POST /intensities
     * @group Intensities - intensity collection management
     * @summary Saves a new intensity in database
     * @param {Intensity.model} Intensity.body.required
     * @returns {JSON} 200 - the intensity created
     */
    .post(flush, validateBody(intensitySchema), intensityController.newIntensity);

router.route('/intensities/:id(\\d+)')
    /**
     * @route GET /intensities/{id}
     * @group Intensities - intensity collection management
     * @summary Returns one intensity and its associated perfume names from database
     * @param {number} id.path.required - the intensity's id to look for
     * @returns {JSON} 200 - one intensity and its associated perfume names from database
     */
    .get(cache, intensityController.oneIntensity)
    /**
     * @route PATCH /intensities/{id}
     * @group Intensities - intensity collection management
     * @summary Modifies a intensity according to its id in database
     * @param {number} id.path.required - the intensity's id to look for
     * @param {Intensity.model} Intensity.body.required
     * @returns {JSON} 200 - the intensity modified
     */
    .patch(flush, validateBody(intensitySchema), intensityController.updateOneIntensity)
    /**
     * @route DELETE /intensities/{id}
     * @group Intensities - intensity collection management
     * @summary Deletes one intensity from the database
     * @param {number} id.path.required - the intensity's id to delete 
     * @returns {JSON} 200 - success message
     */
    .delete(flush, intensityController.deleteOneIntensity);

module.exports = router;