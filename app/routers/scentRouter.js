/**
 * @module scentRouter
 * @description This module provides routes for scents CRUD
 */
const { Router } = require('express');
const router = Router();

const scentController = require('../controllers/scentController');

// schémas de validation des données (joi)
const { scentSchema } = require('../services/schema');

// validateur des données (joi)
const { validateBody } = require('../services/validator');

// service de mise en cache
const cacheGenerator = require('../services/cache');
const { cache, flush } = cacheGenerator({
    ttl:10000,
    prefix: "perf"
});

router.route('/scents')
    /**
     * @route GET /scents
     * @group Scents - scent collection management
     * @summary Returns all the scents from database
     * @returns {JSON} 200 - all the scents from database
     */
    .get(cache, scentController.allScents)
    /**
     * @route POST /scents
     * @group Scents - scent collection management
     * @summary Saves a new scent in database
     * @param {Scent.model} Scent.body.required
     * @returns {JSON} 200 - the scent created
     */
    .post(flush, validateBody(scentSchema), scentController.newScent);

router.route('/scents/:id(\\d+)')
    /**
     * @route GET /scents/{id}
     * @group Scents - scent collection management
     * @summary Returns one scent and its associated perfume names from database
     * @param {number} id.path.required - the scent's id to look for
     * @returns {JSON} 200 - one scent and the name of the associated perfumes from database
     */
    .get(cache, scentController.oneScent)
    /**
     * @route PATCH /scents/{id}
     * @group Scents - scent collection management
     * @summary Modifies a scent according to its id in database
     * @param {number} id.path.required - the scent's id to modify
     * @param {Scent.model} Scent.body.required
     * @returns {JSON} 200 - the scent modified
     */
    .patch(flush, validateBody(scentSchema), scentController.updateOneScent)
    /**
     * @route DELETE /scents/{id}
     * @group Scents - scent collection management
     * @summary Deletes one scent from the database
     * @param {number} id.path.required - the scent's id to delete
     * @returns {JSON} 200 - success message
     */
    .delete(flush, scentController.deleteOneScent);

module.exports = router;