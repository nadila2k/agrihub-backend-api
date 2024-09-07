

// Create Farmer Statistic
const FarmerStatistic = require('../models/farmerStatisticModel'); // Import the model

// Create Farmer Statistic
const createFarmerStatistic = async (req, res) => {
  try {
    const { perch, monthId, progressId, userId, cropsStatisticId } = req.body;

    const newFarmerStatistic = await FarmerStatistic.create({
      perch,
      monthId,
      progressId,
      userId,
      cropsStatisticId,
    });

    res.status(201).json({
      success: true,
      message: "Farmer statistic created successfully",
      data: newFarmerStatistic,
    });
  } catch (error) {
    console.error("Error creating farmer statistic:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create farmer statistic",
      error: error.message,
    });
  }
};

// Update Farmer Statistic
const updateFarmerStatistic = async (req, res) => {
  try {
    const { id } = req.params;
    const { perch, monthId, progressId, userId, cropsStatisticId } = req.body;

    const [updatedRows] = await FarmerStatistic.update(
      {
        perch,
        monthId,
        progressId,
        userId,
        cropsStatisticId,
      },
      { where: { id } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Farmer statistic not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Farmer statistic updated successfully",
    });
  } catch (error) {
    console.error("Error updating farmer statistic:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update farmer statistic",
      error: error.message,
    });
  }
};

// Get All Farmer Statistics
const getAllFarmerStatistic = async (req, res) => {
  try {
    const farmerStatistics = await FarmerStatistic.findAll();
    res.status(200).json({
      success: true,
      data: farmerStatistics,
    });
  } catch (error) {
    console.error("Error fetching farmer statistics:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch farmer statistics",
      error: error.message,
    });
  }
};

// Get Farmer Statistic by ID
const getFarmerStatistic = async (req, res) => {
  try {
    const { id } = req.params;

    const farmerStatistic = await FarmerStatistic.findByPk(id);

    if (!farmerStatistic) {
      return res.status(404).json({
        success: false,
        message: "Farmer statistic not found",
      });
    }

    res.status(200).json({
      success: true,
      data: farmerStatistic,
    });
  } catch (error) {
    console.error("Error fetching farmer statistic:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch farmer statistic",
      error: error.message,
    });
  }
};

module.exports = { createFarmerStatistic, updateFarmerStatistic, getAllFarmerStatistic, getFarmerStatistic };

