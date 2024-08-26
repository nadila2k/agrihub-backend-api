const express = require("express");
const router = express.Router();

const { createFarmerStatistic, updateFarmerStatistic ,getAllFarmerStatistic  } = require("../controller/farmerStatisticController");

router.route("/createFarmerStatistic").post(createFarmerStatistic);
router.route("/updateFarmerStatistic").put(updateFarmerStatistic);
router.route("/getAllFarmerStatistic").get(getAllFarmerStatistic);

module.exports = router;