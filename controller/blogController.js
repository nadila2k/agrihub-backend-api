const Blog = require("../models/blogModel");

const createBlog =async (req,res)=>{
    console.log("create Blog")
    try {
      const { title, description, image } = req.body;
  
    
      const newBlog = await Blog.create({ title, description, image });
  
      res.status(201).json({
        message: "Blog created successfully",
        data: newBlog,
      });
    } catch (error) {
      console.error("Error creating blog:", error);
      res.status(500).json({
        message: "An error occurred while creating the blog",
        error: error.message,
      });
    }
    
}

const getAllBlog =async (req,res)=>{
  console.log("create Blog")

  try {
    
    const blogs = await Blog.findAll({
      attributes: ['id', 'title', 'description', 'image'],
    });

    res.status(200).json({
      message: "Blogs retrieved successfully",
      data: blogs,
    });
  } catch (error) {
    console.error("Error retrieving blogs:", error);
    res.status(500).json({
      message: "An error occurred while retrieving the blogs",
      error: error.message,
    });
  }
}

const updateBlog =async (req,res)=>{
  console.log("update Blog")

  try {
    const { id } = req.params;
    const { title, description, image } = req.body;

    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found.",
      });
    }

    
    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.image = image || blog.image;

    await blog.save();

    res.status(200).json({
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({
      message: "An error occurred while updating the blog",
      error: error.message,
    });
  }
}

const deleteBlog =async (req,res)=>{
  console.log("Dlete Blog")
  try {
    const { id } = req.params;

    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found.",
      });
    }

    await blog.destroy();

    res.status(200).json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({
      message: "An error occurred while deleting the blog",
      error: error.message,
    });
  }
}

module.exports ={ getAllBlog,createBlog,updateBlog,deleteBlog };