const express = require("express");
const router = express.Router();

const { getAllYears } = require("../controller/yearsController");

router.route("/allYears").get(getAllYears);


module.exports = router;