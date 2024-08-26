const { DataTypes } = require("sequelize");
const { sequelize } = require("./../database/dbConfig");

const Crops = require('./cropsModel');

const CropsStatistic = sequelize.define(
  'cropsStatistic',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    year: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    weight: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    production: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    cropsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Crops,
        key: 'id',
      },
    },
  },
  { timestamps: true }
);

module.exports = CropsStatistic;