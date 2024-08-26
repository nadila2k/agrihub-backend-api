const express = require("express");
const router = express.Router();

const { createCrops, updateCrops ,getAllCrops  } = require("../controller/cropsController");

router.route("/createCrops").post(createCrops);
router.route("/updateCrops").put(updateCrops);
router.route("/getAllCrops").get(getAllCrops);

module.exports = router;