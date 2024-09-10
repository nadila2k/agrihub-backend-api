const fs = require('fs');
const path = require('path');
const Product = require('../models/productModel');
const upload = require('../middleware/upload');

const createProduct = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err });
    }

    try {
      const { name, qty, description, price, availability, productType, userId } = req.body;
      const image = req.file ? req.file.path : null;

      const newProduct = await Product.create({
        name,
        qty,
        description,
        price,
        availability,
        productType,
        image,
        userId,
      });

      res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: newProduct,
      });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ success: false, message: "Failed to create product" });
    }
  });
};

const updateProduct = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err });
    }

    try {
      const { id } = req.params;
      const { name, qty, description, price, availability, productType, userId } = req.body;
      const newImage = req.file ? req.file.path : null;

      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }

      // Delete the old image file if a new image is uploaded
      if (newImage && product.image) {
        const oldImagePath = path.join(__dirname, '..', product.image);
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Error deleting old image file:", err);
          }
        });
      }

      product.name = name || product.name;
      product.qty = qty || product.qty;
      product.description = description || product.description;
      product.price = price || product.price;
      product.availability = availability || product.availability;
      product.productType = productType || product.productType;
      product.image = newImage || product.image;
      product.userId = userId || product.userId;

      await product.save();

      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: product,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ success: false, message: "Failed to update product" });
    }
  });
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Delete the image file if it exists
    if (product.image) {
      const imagePath = path.join(__dirname, '..', product.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting image file:", err);
        }
      });
    }

    await Product.destroy({ where: { id } });

    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ success: false, message: "Failed to delete product" });
  }
};

const getAllProduct = async (req, res) => {
  console.log("Fetching all products");

  try {
    const products = await Product.findAll({
      attributes: ['id', 'name', 'qty', 'description', 'price', 'availability', 'productType', 'image'],
    });

    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      data: products,
    });
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the products",
      error: error.message,
    });
  }
};


const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const productWithImageUrl = {
      ...product.dataValues,
      image: product.image ? `${req.protocol}://${req.get('host')}/${product.image}` : null
    };

    res.status(200).json({
      success: true,
      data: productWithImageUrl
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ success: false, message: "Failed to fetch product" });
  }
};

module.exports = { createProduct, updateProduct, deleteProduct, getAllProduct, getProduct };


