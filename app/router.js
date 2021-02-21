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
const { validateBody, validateQuery } = require('./services/validator');

router.route('/perfumes')
    /**
     * @route GET /perfumes
     * @group Perfumes - perfume collection management
     * @summary Returns all the perfumes and their associated tags and scents from database
     * @returns {JSON[]} 200 - all the perfumes from database
     */
    .get(perfumeController.allPerfumes)
    /**
     * @route POST /perfumes
     * @group Perfumes - perfume collection management
     * @summary Saves a new perfume in database
     * @returns {JSON[]} 200 - the perfume created
     */
    .post(validateBody(perfumeSchema), perfumeController.newPerfume);

router.route('/perfumes/:id(\\d+)')
    /**
     * @route GET /perfumes/{id}
     * @group Perfumes - perfume collection management
     * @summary Returns one perfume its associated tags and scents from database
     * @returns {JSON[]} 200 - one perfume from database
     */
    .get(perfumeController.onePerfume)
    /**
     * @route PATCH /perfumes/{id}
     * @group Perfumes - perfume collection management
     * @summary Modifies a perfume according to its id in database
     * @returns {JSON[]} 200 - the perfume modified
     */
    .patch(validateBody(perfumeSchema), perfumeController.updateOnePerfume);

router.route('/perfumes/:id/scents')
    /**
     * @route POST /perfumes/{id}/scents
     * @group Perfumes - perfume collection management
     * @summary Saves a new association between a perfume and a scent in database
     * @returns {JSON[]} 200 - the association created
     */
    .post(validateBody(perfumeScentSchema), scentController.newAssociation);

router.route('/perfumes/:id/tags')
    /**
     * @route POST /perfumes/{id}/tags
     * @group Perfumes - perfume collection management
     * @summary Saves a new association between a perfume and a tag in database
     * @returns {JSON[]} 200 - the association created
     */
    .post(validateBody(perfumeTagSchema), tagController.newAssociation);


router.route('/genders')
    /**
     * @route GET /genders
     * @group Genders - gender collection management
     * @summary Returns all the genders from database
     * @returns {JSON[]} 200 - all the genders from database
     */
    .get(genderController.allGenders)
    /**
     * @route POST /genders
     * @group Genders - gender collection management
     * @summary Saves a new gender in database
     * @returns {JSON[]} 200 - the gender created
     */
    .post(validateBody(genderSchema), genderController.newGender);

router.route('/genders/:id(\\d+)')
    /**
     * @route GET /genders/{id}
     * @group Genders - gender collection management
     * @summary Returns one gender and its associated perfume names from database
     * @returns {JSON[]} 200 - one gender from database
     */
    .get(genderController.oneGender)
    /**
     * @route PATCH /genders/{id}
     * @group Genders - gender collection management
     * @summary Modifies a gender according to its id in database
     * @returns {JSON[]} 200 - the gender modified
     */
    .patch(validateBody(genderSchema), genderController.updateOneGender);

router.route('/intensities')
    /**
     * @route GET /intensities
     * @group Intensities - intensity collection management
     * @summary Returns all the intensities from database
     * @returns {JSON[]} 200 - all the intensities from database
     */
    .get(intensityController.allIntensities)
    /**
     * @route POST /intensities
     * @group Intensities - intensity collection management
     * @summary Saves a new intensity in database
     * @returns {JSON[]} 200 - the intensity created
     */
    .post(validateBody(intensitySchema), intensityController.newIntensity);

router.route('/intensities/:id(\\d+)')
    /**
     * @route GET /intensities/{id}
     * @group Intensities - intensity collection management
     * @summary Returns one intensity and its associated perfume names from database
     * @returns {JSON[]} 200 - one intensity from database
     */
    .get(intensityController.oneIntensity)
    /**
     * @route PATCH /intensities/{id}
     * @group Intensities - intensity collection management
     * @summary Modifies a intensity according to its id in database
     * @returns {JSON[]} 200 - the intensity modified
     */
    .patch(validateBody(intensitySchema), intensityController.updateOneIntensity);

router.route('/scents')
    /**
     * @route GET /scents
     * @group Scents - scent collection management
     * @summary Returns all the scents from database
     * @returns {JSON[]} 200 - all the scents from database
     */
    .get(scentController.allScents)
    /**
     * @route POST /scents
     * @group Scents - scent collection management
     * @summary Saves a new scent in database
     * @returns {JSON[]} 200 - the scent created
     */
    .post(validateBody(scentSchema), scentController.newScent);

router.route('/scents/:id(\\d+)')
    /**
     * @route GET /scents/{id}
     * @group Scents - scent collection management
     * @summary Returns one scent and its associated perfume names from database
     * @returns {JSON[]} 200 - one scent from database
     */
    .get(scentController.oneScent)
    /**
     * @route PATCH /scents/{id}
     * @group Scents - scent collection management
     * @summary Modifies a scent according to its id in database
     * @returns {JSON[]} 200 - the scent modified
     */
    .patch(validateBody(scentSchema), scentController.updateOneScent);


router.route('/tags')
    /**
     * @route GET /tags
     * @group Tags - tag collection management
     * @summary Returns all the tags from database
     * @returns {JSON[]} 200 - all the tags from database
     */
    .get(tagController.allTags)
    /**
     * @route POST /tags
     * @group Tags - tag collection management
     * @summary Saves a new tag in database
     * @returns {JSON[]} 200 - the tag created
     */
    .post(validateBody(tagSchema), tagController.newTag);

router.route('/tags/:id(\\d+)')
    /**
     * @route GET /tags/{id}
     * @group Tags - tag collection management
     * @summary Returns one tag and its associated perfume names from database
     * @returns {JSON[]} 200 - one tag from database
     */
    .get(tagController.oneTag)
    /**
     * @route PATCH /tags/{id}
     * @group Tags - tag collection management
     * @summary Modifies a tag according to its id in database
     * @returns {JSON[]} 200 - the tag modified
     */
    .patch(validateBody(tagSchema), tagController.updateOneTag);

module.exports = router;