const Product = require('../models/productModel');


const createProduct = async (req, res) => {
  try {
    const { name, qty, description, price, availability, productType, image, userId } = req.body;

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
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Failed to create product" });
  }
};


const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, qty, description, price, availability, productType, image, userId } = req.body;

    const updatedProduct = await Product.update(
      {
        name,
        qty,
        description,
        price,
        availability,
        productType,
        image,
        userId,
      },
      { where: { id } }
    );

    if (updatedProduct[0] === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Failed to update product" });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.destroy({ where: { id } });

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
};


const getAllProduct = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};


const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

module.exports = { createProduct, updateProduct, deleteProduct, getAllProduct, getProduct };


