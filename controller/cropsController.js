const Crops = require("../models/cropsModel");

const createCrops = async (req, res) => {
  console.log("create crops");
  try {
    const { id } = req.params;

    
    const crop = await Crops.findByPk(id);

    
    if (!crop) {
      return res.status(404).json({
        success: false,
        message: "Crop not found.",
      });
    }

    
    await crop.destroy();

    res.status(200).json({
      success: true,
      message: "Crop deleted successfully!",
    });
  } catch (error) {
    console.error("Error deleting crop:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete crop",
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
