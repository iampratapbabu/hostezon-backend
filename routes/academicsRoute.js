const express = require("express");
const authController = require('../controllers/authContoller');
const academicsController = require("../controllers/academicsController");


const router = express.Router();



router.route('/syllabus')
.get(academicsController.getAll)
.post(academicsController.createOne);

router.route('/:branch/:year/:semester')
	.get(authController.protect,academicsController.singleBranch)
	.patch(authController.protect,academicsController.updateSingleBranch);



// router.route("/previous-year-papers")







module.exports = router;

