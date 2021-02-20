const { Router } = require('express');
const router = Router();

const perfumeController = require('./controllers/perfumeController');
const genderController = require('./controllers/genderController');
const intensityController = require('./controllers/intensityController');
const scentController = require('./controllers/scentController');
const tagController = require('./controllers/tagController');


router.route('/perfumes')
/**
 * @route GET /perfumes
 * @group Perfumes - perfume collection management
 * @summary Returns all the perfumes from database
 * @returns {JSON[]} 200 - all the perfumes from database
 */
    .get(perfumeController.allPerfumes);


router.route('/genders')
/**
 * @route GET /genders
 * @group Genders - gender collection management
 * @summary Returns all the genders from database
 * @returns {JSON[]} 200 - all the genders from database
 */
    .get(genderController.allGenders);

router.route('/intensities')
/**
 * @route GET /intensities
 * @group Intensities - intensity collection management
 * @summary Returns all the intensities from database
 * @returns {JSON[]} 200 - all the intensities from database
 */
    .get(intensityController.allIntensities);

router.route('/scents')
/**
 * @route GET /scents
 * @group Scents - scent collection management
 * @summary Returns all the scents from database
 * @returns {JSON[]} 200 - all the scents from database
 */
    .get(scentController.allScents);

router.route('/tags')
/**
 * @route GET /tags
 * @group Tags - tag collection management
 * @summary Returns all the tags from database
 * @returns {JSON[]} 200 - all the tags from database
 */
    .get(tagController.allTags);

module.exports = router;