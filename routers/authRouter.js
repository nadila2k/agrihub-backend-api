const express = require("express");
const router = express.Router();

const { signUp, signIn } = require("../controller/authController");

router.route("/signUp").post(signUp);
router.route("/signIn").post(signIn);

module.exports = router;
