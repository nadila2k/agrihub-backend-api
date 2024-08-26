const express = require("express");
const router = express.Router();

const { createProduct, updateProduct ,deleteProduct,getAllProduct  } = require("../controller/productController");

router.route("/createProduct").post(createProduct);
router.route("/updateProduct").put(updateProduct);
router.route("/deleteProduct").delete(deleteProduct);
router.route("/getAllProduct").get(getAllProduct);

module.exports = router;