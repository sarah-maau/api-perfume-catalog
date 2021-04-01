/**
 * @module perfumeRouter
 * @description This module provides routes for perfumes CRUD
 */
const { Router } = require('express');
const router = Router();

const perfumeController = require('../controllers/perfumeController');
const scentController = require('../controllers/scentController');
const tagController = require('../controllers/tagController');

// data validation schema (joi)
const { perfumeSchema, perfumeScentSchema, perfumeTagSchema } = require('../services/schema');

// data validator (joi)
const { validateBody } = require('../services/validator');

// caching service
const cacheGenerator = require('../services/cache');
const { cache, flush } = cacheGenerator({
    ttl:10000,
    prefix: "perf"
});

router.route('/perfumes')
    /**
     * @route GET /perfumes
     * @group Perfumes - perfume collection management
     * @summary Returns all the perfumes and their associated tags and scents from database
     * @returns {JSON} 200 - all the perfumes from database
     */
    .get(perfumeController.allPerfumes)
    /**
     * @route POST /perfumes
     * @group Perfumes - perfume collection management
     * @summary Saves a new perfume in database
     * @param {Perfume.model} Perfume.body.required
     * @returns {JSON} 200 - the perfume created
     */
    .post(flush, validateBody(perfumeSchema), perfumeController.newPerfume);

router.route('/perfumes/:id(\\d+)')
    /**
     * @route GET /perfumes/{id}
     * @group Perfumes - perfume collection management
     * @summary Returns one perfume and its associated tags and scents from database
     * @param {number} id.path.required - the perfume's id to look for 
     * @returns {JSON} 200 - one perfume from database
     */
    .get(cache, perfumeController.onePerfume)
    /**
     * @route PATCH /perfumes/{id}
     * @group Perfumes - perfume collection management
     * @summary Modifies a perfume according to its id in database
     * @param {number} id.path.required - the perfume's id to modify
     * @param {Perfume.model} Perfume.body.required
     * @returns {JSON} 200 - the perfume modified
     */
    .patch(flush, validateBody(perfumeSchema), perfumeController.updateOnePerfume)
    /**
     * @route DELETE /perfumes/{id}
     * @group Perfumes - perfume collection management
     * @summary Deletes one perfume from the database
     * @param {number} id.path.required - the perfume's id to delete
     * @returns {JSON} 200 - success message
     */
    .delete(flush, perfumeController.deleteOnePerfume);

router.route('/perfumes/:id/scents')
    /**
     * @route POST /perfumes/{id}/scents
     * @group Perfumes - perfume collection management
     * @summary Saves a new association between a perfume and a scent in database
     * @param {number} id.path.required - the perfume's id to associate with a scent
     * @param {PerfumeHasScent.model} PerfumeHasScent.body.required - perfumeId is the id requested in params
     * @returns {JSON} 200 - the association created
     */
    .post(flush, validateBody(perfumeScentSchema), scentController.newAssociation);

router.route('/perfumes/:perfumeId/scents/:scentId')
    /**
     * @route DELETE /perfumes/{perfumeId}/scents/{scentId}
     * @group Perfumes - perfume collection management
     * @summary Deletes one association between a perfume and a scent from database
     * @param {number} perfumeId.path.required - the perfume's id
     * @param {number} scentId.path.required - the scent's id
     * @returns {JSON} 200 - success message
     */
    .delete(flush, scentController.removeAssociation);

router.route('/perfumes/:id/tags')
    /**
     * @route POST /perfumes/{id}/tags
     * @group Perfumes - perfume collection management
     * @summary Saves a new association between a perfume and a tag in database
     * @param {number} id.path.required - the perfume's id to associate with a tag
     * @param {PerfumeHasTag.model} PerfumeHasTag.body.required - perfumeId is the id requested in params
     * @returns {JSON} 200 - the association created
     */
    .post(flush, validateBody(perfumeTagSchema), tagController.newAssociation);

router.route('/perfumes/:perfumeId/tags/:tagId')
    /**
     * @route DELETE /perfumes/{perfumeId}/tags/{tagId}
     * @group Perfumes - perfume collection management
     * @summary Deletes one association between a perfume and a tag from database
     * @param {number} perfumeId.path.required - the perfume's id
     * @param {number} tagId.path.required - the tag's id
     * @returns {JSON} 200 - success message
     */
    .delete(flush, tagController.removeAssociation);

module.exports = router;