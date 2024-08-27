const Crops = require("../models/cropsModel");

const createCrops = async (req, res) => {
  console.log("create crops");
  try {
    console.log("create crops");

    const { name } = req.body;

    const newCrop = await Crops.create({ name });

    res.status(201).json({
      success: true,
      message: "Crop created successfully!",
      data: newCrop
    });
  } catch (error) {
    console.error("Error creating crop:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create crop",
      error: error.message,
    });
  }
};

const updateCrops = async (req, res) => {
  console.log("updateCrops");
};

const getAllCrops = async (req, res) => {
  console.log("getallCrops");

  try {
    console.log("getAllCrops");

    const crops = await Crops.findAll({
      attributes: ["id", "name"],
    });

    res.status(200).json({
      success: true,
      data: crops,
    });
  } catch (error) {
    console.error("Error fetching crops:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve crops",
      error: error.message,
    });
  }
};

module.exports = { createCrops, updateCrops, getAllCrops };
