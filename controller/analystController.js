const { sequelize } = require("../database/dbConfig");

const getFarmerAnalyst = async (req, res) => {

  let {year, cropsId} = req.query;

  year = year || new Date().getFullYear();
  cropsId = cropsId || 1;

  const [results, metadata] = await sequelize.query(`
    SELECT 
      max(y.id) AS "year_id", 
      max(y.year) AS "year",
      max(cs.weight) AS "year_weight_estimate",
      max(cs.production) AS "per_perch_production",
      max(cs."cropsId") AS "crops_id",
      max(c.name) AS "crops_name",
      max(fs.perch) AS "perch_count",
      max(fs."progressId") AS "progress",
      max(fs."userId") AS "farmer_id",
      sum(cs.production * fs.perch) AS "farmer_monthly_production",
      max(m.month) AS "month"
      -- fs.*
      -- cs.*
    FROM public.years y
    LEFT JOIN public."cropsStatistics" cs ON cs."yearId" = y.id
    LEFT JOIN crops c ON c.id = cs."cropsId"
    LEFT JOIN public."farmerStatistics" fs ON fs."cropsStatisticId" = cs.id
    LEFT JOIN months m ON fs."monthId" = m.id
    WHERE y.year=${year} AND cs."cropsId"=${cropsId}
    GROUP BY m.id
  `);

  res.status(200).json({
    status: "success",
    message: "Data fetched",
    data: {
      data: results
    }
  })
};

const getAdminChart = async (req, res) => {

  
console.log("admin cart")
};

const getFarmerChartId = async (req, res) => {

  
  console.log("farmer Chart id  cart")
};

module.exports = { getFarmerAnalyst ,getAdminChart,getFarmerChartId };
