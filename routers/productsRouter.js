const express = require("express");
const router = express.Router();

const { createProduct, updateProduct ,deleteProduct,getAllProduct,getProduct  } = require("../controller/productController");

router.route("/").post(createProduct).get(getAllProduct);
router.route("/:id").put(updateProduct).delete(deleteProduct).get(getProduct);


module.exports = router;