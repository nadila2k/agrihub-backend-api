const { DataTypes } = require('sequelize');
const { sequelize } = require("./../database/dbConfig");
const User = require('./userModel');
const CropsStatistic = require('./cropsStatisticModel');

const FarmerStatistic = sequelize.define(
  'farmerStatistic',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    perch: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    month: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    process: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    cropsStatisticId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: CropsStatistic,
        key: 'id',
      },
    },
  },
  { timestamps: true }
);

module.exports = FarmerStatistic;