const express = require("express");
const router = express.Router();

const { createCropsStatistic, updateCropsStatistic ,getAllCropsStatistic  } = require("../controller/cropsStatisticController");

router.route("/").post(createCropsStatistic).get(getAllCropsStatistic);
router.route("/:id").put(updateCropsStatistic);


module.exports = router;