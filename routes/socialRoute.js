const express = require('express');
const socialController = require('../controllers/socialController');

const router = express.Router();

router.route('/').get(socialController.getSocial);

module.exports = router;




