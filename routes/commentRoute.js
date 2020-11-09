const express = require('express');
const commentController = require('../controllers/commentController');
const authController = require('../controllers/authContoller');



const router = express.Router();

router.route('/')
.get(commentController.getAllComment)
.post(authController.protect,commentController.createComment);



module.exports = router;