const express = require("express");
const router = express.Router();

const { createCropsStatistic, updateCropsStatistic ,getAllCropsStatistic  } = require("../controller/cropsStatisticController");

router.route("/createCropsStatistic").post(createCropsStatistic);
router.route("/updateCropsStatistic").put(updateCropsStatistic);
router.route("/getAllCropsStatistic").get(getAllCropsStatistic);

module.exports = router;