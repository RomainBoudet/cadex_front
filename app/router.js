const { Router } = require('express');

const router = Router();

const mainController = require('./controllers/mainController');

/**
 * 
 */
router.get('/cloud', mainController.cloud);

/**
 * 
 */
router.get('/particles', mainController.particles);

module.exports = router;