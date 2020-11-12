const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authContoller");

const router = express.Router();

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);

router.route("/").get(userController.getAllUsers);
router.route("/:id")
    .get(userController.getUser)
    .patch(authController.protect,userController.updateUser)
    .delete(authController.protect,userController.deleteUser);

router.route("/hello").get(authController.testRoute);
router.route("/forgot-password").post(authController.forgotPassword);
router.route("/reset-password/:token").patch(authController.resetPassword);
router.route('/update-me').patch(authController.protect,userController.updateMe);
router.route('/update-password').patch(authController.protect,authController.updatePassword);
router.route('/delete-me').delete(authController.protect,userController.deleteMe);

//These routes are mainly for development
router.route('/test-route').get(authController.protect,authController.testRoute);
router.route("/my-route").get(userController.myRoute);





module.exports = router;
