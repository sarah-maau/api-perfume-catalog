/**
 * @module tagRouter
 * @description This module provides routes for tags CRUD
 */
const { Router } = require('express');
const router = Router();

const tagController = require('../controllers/tagController');

// schémas de validation des données (joi)
const { tagSchema } = require('../services/schema');

// validateur des données (joi)
const { validateBody } = require('../services/validator');

// service de mise en cache
const cacheGenerator = require('../services/cache');
const { cache, flush } = cacheGenerator({
    ttl:10000,
    prefix: "perf"
});

router.route('/tags')
    /**
     * @route GET /tags
     * @group Tags - tag collection management
     * @summary Returns all the tags from database
     * @returns {JSON} 200 - all the tags from database
     */
    .get(cache, tagController.allTags)
    /**
     * @route POST /tags
     * @group Tags - tag collection management
     * @summary Saves a new tag in database
     * @param {Tag.model} Tag.body.required
     * @returns {JSON} 200 - the tag created
     */
    .post(flush, validateBody(tagSchema), tagController.newTag);

router.route('/tags/:id(\\d+)')
    /**
     * @route GET /tags/{id}
     * @group Tags - tag collection management
     * @summary Returns one tag and its associated perfume names from database
     * @param {number} id.path.required - the tag's id to look for
     * @returns {JSON} 200 - one tag its associated perfume names from database
     */
    .get(cache, tagController.oneTag)
    /**
     * @route PATCH /tags/{id}
     * @group Tags - tag collection management
     * @summary Modifies a tag according to its id in database
     * @param {number} id.path.required - the tag's id to modify
     * @param {Tag.model} Tag.body.required
     * @returns {JSON} 200 - the tag modified
     */
    .patch(flush, validateBody(tagSchema), tagController.updateOneTag)
    /**
     * @route DELETE /tags/{id}
     * @group Tags - tag collection management
     * @summary Deletes one tag from the database
     * @param {number} id.path.required - the tag's id to delete
     * @returns {JSON} 200 - success message
     */
    .delete(flush, tagController.deleteOneTag);

module.exports = router;