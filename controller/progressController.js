const progress = require("../models/progressModel.js");

const getAllProgress = async (req, res) => {
  console.log(" get All Progress");

  try {
    
    const progress = await progress.findAll({
      attributes: ['id', 'name']
    });

    res.status(200).json({
      success: true,
      data: progress,
    });
  } catch (error) {
    console.error("Error fetching progress:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve progress",
      error: error.message,
    });
  }
};

module.exports = {getAllProgress};