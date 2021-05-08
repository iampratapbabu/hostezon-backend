const express = require('express');
const learningController = require('../controllers/learningController');

const router = express.Router();

router.route('/url-1')
.get(learningController.getSample);



module.exports = router;