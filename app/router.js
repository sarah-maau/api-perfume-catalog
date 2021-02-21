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
 * @summary Returns all the perfumes and their associated tags and scents from database
 * @returns {JSON[]} 200 - all the perfumes from database
 */
    .get(perfumeController.allPerfumes);

router.route('/perfumes/:id(\\d+)')
/**
 * @route GET /perfumes/{id}
 * @group Perfumes - perfume collection management
 * @summary Returns one perfume its associated tags and scents from database
 * @returns {JSON[]} 200 - one perfume from database
 */
    .get(perfumeController.onePerfume);


router.route('/genders')
/**
 * @route GET /genders
 * @group Genders - gender collection management
 * @summary Returns all the genders from database
 * @returns {JSON[]} 200 - all the genders from database
 */
    .get(genderController.allGenders);

router.route('/genders/:id(\\d+)')
/**
 * @route GET /genders/{id}
 * @group Genders - gender collection management
 * @summary Returns one gender and its associated perfume names from database
 * @returns {JSON[]} 200 - one gender from database
 */
    .get(genderController.oneGender);

router.route('/intensities')
/**
 * @route GET /intensities
 * @group Intensities - intensity collection management
 * @summary Returns all the intensities from database
 * @returns {JSON[]} 200 - all the intensities from database
 */
    .get(intensityController.allIntensities);

router.route('/intensities/:id(\\d+)')
/**
 * @route GET /intensities/{id}
 * @group Intensities - intensity collection management
 * @summary Returns one intensity and its associated perfume names from database
 * @returns {JSON[]} 200 - one intensity from database
 */
    .get(intensityController.oneIntensity);

router.route('/scents')
/**
 * @route GET /scents
 * @group Scents - scent collection management
 * @summary Returns all the scents from database
 * @returns {JSON[]} 200 - all the scents from database
 */
    .get(scentController.allScents);

router.route('/scents/:id(\\d+)')
/**
 * @route GET /scents/{id}
 * @group Scents - scent collection management
 * @summary Returns one scent and its associated perfume names from database
 * @returns {JSON[]} 200 - one scent from database
 */
    .get(scentController.oneScent);


router.route('/tags')
/**
 * @route GET /tags
 * @group Tags - tag collection management
 * @summary Returns all the tags from database
 * @returns {JSON[]} 200 - all the tags from database
 */
    .get(tagController.allTags);

router.route('/tags/:id(\\d+)')
/**
 * @route GET /tags/{id}
 * @group Tags - tag collection management
 * @summary Returns one tag and its associated perfume names from database
 * @returns {JSON[]} 200 - one tag from database
 */
    .get(tagController.oneTag);

module.exports = router;