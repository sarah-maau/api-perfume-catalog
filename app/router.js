const { Router } = require('express');
const router = Router();

const perfumeController = require('./controllers/perfumeController');
const genderController = require('./controllers/genderController');
const intensityController = require('./controllers/intensityController');
const scentController = require('./controllers/scentController');
const tagController = require('./controllers/tagController');

// schémas de validation des données (joi)
const { perfumeSchema, genderSchema, scentSchema, tagSchema, intensitySchema, perfumeScentSchema, perfumeTagSchema } = require('./schemas/modelSchemas');

// validateur des données (joi)
const { validateBody } = require('./services/validator');

/********* PERFUMES *********/
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
    .post(validateBody(perfumeSchema), perfumeController.newPerfume);

router.route('/perfumes/:id(\\d+)')
    /**
     * @route GET /perfumes/{id}
     * @group Perfumes - perfume collection management
     * @summary Returns one perfume and its associated tags and scents from database
     * @param {number} id.path.required - the perfume's id to look for 
     * @returns {JSON} 200 - one perfume from database
     */
    .get(perfumeController.onePerfume)
    /**
     * @route PATCH /perfumes/{id}
     * @group Perfumes - perfume collection management
     * @summary Modifies a perfume according to its id in database
     * @param {number} id.path.required - the perfume's id to modify
     * @param {Perfume.model} Perfume.body.required
     * @returns {JSON} 200 - the perfume modified
     */
    .patch(validateBody(perfumeSchema), perfumeController.updateOnePerfume)
    /**
     * @route DELETE /perfumes/{id}
     * @group Perfumes - perfume collection management
     * @summary Deletes one perfume from the database
     * @param {number} id.path.required - the perfume's id to delete
     * @returns {JSON} 200 - success message
     */
    .delete(perfumeController.deleteOnePerfume);

router.route('/perfumes/:id/scents')
    /**
     * @route POST /perfumes/{id}/scents
     * @group Perfumes - perfume collection management
     * @summary Saves a new association between a perfume and a scent in database
     * @param {number} id.path.required - the perfume's id to associate with a scent
     * @param {PerfumeHasScent.model} PerfumeHasScent.body.required - perfumeId is the id requested in params
     * @returns {JSON} 200 - the association created
     */
    .post(validateBody(perfumeScentSchema), scentController.newAssociation);

router.route('/perfumes/:perfumeId/scents/:scentId')
    /**
     * @route DELETE /perfumes/{perfumeId}/scents/{scentId}
     * @group Perfumes - perfume collection management
     * @summary Deletes one association between a perfume and a scent from database
     * @param {number} perfumeId.path.required - the perfume's id
     * @param {number} scentId.path.required - the scent's id
     * @returns {JSON} 200 - success message
     */
    .delete(scentController.removeAssociation);

router.route('/perfumes/:id/tags')
    /**
     * @route POST /perfumes/{id}/tags
     * @group Perfumes - perfume collection management
     * @summary Saves a new association between a perfume and a tag in database
     * @param {number} id.path.required - the perfume's id to associate with a tag
     * @param {PerfumeHasTag.model} PerfumeHasTag.body.required - perfumeId is the id requested in params
     * @returns {JSON} 200 - the association created
     */
    .post(validateBody(perfumeTagSchema), tagController.newAssociation);

router.route('/perfumes/:perfumeId/tags/:tagId')
    /**
     * @route DELETE /perfumes/{perfumeId}/tags/{tagId}
     * @group Perfumes - perfume collection management
     * @summary Deletes one association between a perfume and a tag from database
     * @param {number} perfumeId.path.required - the perfume's id
     * @param {number} tagId.path.required - the tag's id
     * @returns {JSON} 200 - success message
     */
    .delete(tagController.removeAssociation);

/********* GENDERS *********/
router.route('/genders')
    /**
     * @route GET /genders
     * @group Genders - gender collection management
     * @summary Returns all the genders from database
     * @returns {JSON} 200 - all the genders from database
     */
    .get(genderController.allGenders)
    /**
     * @route POST /genders
     * @group Genders - gender collection management
     * @summary Saves a new gender in database
     * @param {Gender.model} Gender.body.required
     * @returns {JSON} 200 - the gender created
     */
    .post(validateBody(genderSchema), genderController.newGender);

router.route('/genders/:id(\\d+)')
    /**
     * @route GET /genders/{id}
     * @group Genders - gender collection management
     * @summary Returns one gender and its associated perfume names from database
     * @param {number} id.path.required - the gender's id to look for
     * @returns {JSON} 200 - one gender and its associated perfume names from database
     */
    .get(genderController.oneGender)
    /**
     * @route PATCH /genders/{id}
     * @group Genders - gender collection management
     * @summary Modifies a gender according to its id in database
     * @param {number} id.path.required - the gender's id to modify
     * @param {Gender.model} Gender.body.required
     * @returns {JSON} 200 - the gender modified
     */
    .patch(validateBody(genderSchema), genderController.updateOneGender)
    /**
     * @route DELETE /genders/{id}
     * @group Genders - gender collection management
     * @summary Deletes one gender from the database
     * @param {number} id.path.required - the gender's id to delete
     * @returns {JSON} 200 - success message
     */
    .delete(genderController.deleteOneGender);

/********* INTENSITIES *********/
router.route('/intensities')
    /**
     * @route GET /intensities
     * @group Intensities - intensity collection management
     * @summary Returns all the intensities from database
     * @returns {JSON} 200 - all the intensities from database
     */
    .get(intensityController.allIntensities)
    /**
     * @route POST /intensities
     * @group Intensities - intensity collection management
     * @summary Saves a new intensity in database
     * @param {Intensity.model} Intensity.body.required
     * @returns {JSON} 200 - the intensity created
     */
    .post(validateBody(intensitySchema), intensityController.newIntensity);

router.route('/intensities/:id(\\d+)')
    /**
     * @route GET /intensities/{id}
     * @group Intensities - intensity collection management
     * @summary Returns one intensity and its associated perfume names from database
     * @param {number} id.path.required - the intensity's id to look for
     * @returns {JSON} 200 - one intensity and its associated perfume names from database
     */
    .get(intensityController.oneIntensity)
    /**
     * @route PATCH /intensities/{id}
     * @group Intensities - intensity collection management
     * @summary Modifies a intensity according to its id in database
     * @param {number} id.path.required - the intensity's id to look for
     * @param {Intensity.model} Intensity.body.required
     * @returns {JSON} 200 - the intensity modified
     */
    .patch(validateBody(intensitySchema), intensityController.updateOneIntensity)
    /**
     * @route DELETE /intensities/{id}
     * @group Intensities - intensity collection management
     * @summary Deletes one intensity from the database
     * @param {number} id.path.required - the intensity's id to delete 
     * @returns {JSON} 200 - success message
     */
    .delete(intensityController.deleteOneIntensity);

/********* SCENTS *********/
router.route('/scents')
    /**
     * @route GET /scents
     * @group Scents - scent collection management
     * @summary Returns all the scents from database
     * @returns {JSON} 200 - all the scents from database
     */
    .get(scentController.allScents)
    /**
     * @route POST /scents
     * @group Scents - scent collection management
     * @summary Saves a new scent in database
     * @param {Scent.model} Scent.body.required
     * @returns {JSON} 200 - the scent created
     */
    .post(validateBody(scentSchema), scentController.newScent);

router.route('/scents/:id(\\d+)')
    /**
     * @route GET /scents/{id}
     * @group Scents - scent collection management
     * @summary Returns one scent and its associated perfume names from database
     * @param {number} id.path.required - the scent's id to look for
     * @returns {JSON} 200 - one scent and the name of the associated perfumes from database
     */
    .get(scentController.oneScent)
    /**
     * @route PATCH /scents/{id}
     * @group Scents - scent collection management
     * @summary Modifies a scent according to its id in database
     * @param {number} id.path.required - the scent's id to modify
     * @param {Scent.model} Scent.body.required
     * @returns {JSON} 200 - the scent modified
     */
    .patch(validateBody(scentSchema), scentController.updateOneScent)
    /**
     * @route DELETE /scents/{id}
     * @group Scents - scent collection management
     * @summary Deletes one scent from the database
     * @param {number} id.path.required - the scent's id to delete
     * @returns {JSON} 200 - success message
     */
    .delete(scentController.deleteOneScent);

/********* TAGS *********/
router.route('/tags')
    /**
     * @route GET /tags
     * @group Tags - tag collection management
     * @summary Returns all the tags from database
     * @returns {JSON} 200 - all the tags from database
     */
    .get(tagController.allTags)
    /**
     * @route POST /tags
     * @group Tags - tag collection management
     * @summary Saves a new tag in database
     * @param {Tag.model} Tag.body.required
     * @returns {JSON} 200 - the tag created
     */
    .post(validateBody(tagSchema), tagController.newTag);

router.route('/tags/:id(\\d+)')
    /**
     * @route GET /tags/{id}
     * @group Tags - tag collection management
     * @summary Returns one tag and its associated perfume names from database
     * @param {number} id.path.required - the tag's id to look for
     * @returns {JSON} 200 - one tag its associated perfume names from database
     */
    .get(tagController.oneTag)
    /**
     * @route PATCH /tags/{id}
     * @group Tags - tag collection management
     * @summary Modifies a tag according to its id in database
     * @param {number} id.path.required - the tag's id to modify
     * @param {Tag.model} Tag.body.required
     * @returns {JSON} 200 - the tag modified
     */
    .patch(validateBody(tagSchema), tagController.updateOneTag)
    /**
     * @route DELETE /tags/{id}
     * @group Tags - tag collection management
     * @summary Deletes one tag from the database
     * @param {number} id.path.required - the tag's id to delete
     * @returns {JSON} 200 - success message
     */
    .delete(tagController.deleteOneTag);

module.exports = router;