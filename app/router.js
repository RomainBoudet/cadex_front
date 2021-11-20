const { Router } = require('express');

const router = Router();

const mainController = require('./controllers/mainController');

/**
 * Génère un Cadex de manière aléatoire, sur un fond de nuage
 * @route GET /cloud
 * @group Cadex - génération de cadavre exquis
 * @returns {string} 200 - le cadavre exquis généré sur un fond de nuage
 */
router.get('/cloud', mainController.cloud);

/**
 * Génère un Cadex de manière aléatoire, sur un fond de d'étoiles
 * @route GET /particles
 * @group Cadex - génération de cadavre exquis
 * @returns {string} 200 - le cadavre exquis généré sur un fond de d'étoiles
 */
router.get('/particles', mainController.particles);

module.exports = router;