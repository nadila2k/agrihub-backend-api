const express = require("express");
const router = express.Router();

const { getAllBlog,createBlog,updateBlog,deleteBlog } = require("../controller/blogController");

router.route("/allBlog").get(getAllBlog);
router.route("/createBlog").post(createBlog);
router.route("/updateBlog").put(updateBlog);
router.route("/deleteBlog").delete(deleteBlog);


module.exports=router;