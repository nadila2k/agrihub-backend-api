const express = require("express");
const router = express.Router();

const { createProduct, updateProduct ,deleteProduct,getAllProduct  } = require("../controller/productController");

router.route("/").post(createProduct).get(getAllProduct);
router.route("/:id").put(updateProduct).delete(deleteProduct);


module.exports = router;