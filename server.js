const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");

const { connectDb } = require("./database/dbConfig.js");
const User = require("./models/userModel.js");
const Crops = require("./models/cropsModel.js");
const CropsStatistic = require("./models/cropsStatisticModel.js");
const FarmerStatistic  = require("./models/farmerStatisticModel.js");
const Product  = require("./models/productModel.js");
const Years = require("./models/yearsModel.js");
const progress = require("./models/progressModel.js");
const Blog = require("./models/blogModel.js");


const app = express();
const port = process.env.PORT || 5000;

// Middleware Stack
app.use(morgan('dev'));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/api/v1/auth", require("./routers/authRouter"));
app.use("/api/v1/crops", require("./routers/cropsRouter"));
app.use("/api/v1/cropsStatistic", require("./routers/cropsStatisticRouter"));
app.use("/api/v1/farmerStatistic", require("./routers/farmerStatisticRouter"));
app.use("/api/v1/product", require("./routers/productsRouter"));
app.use("/api/v1/years", require("./routers/yearsRouter"));
app.use("/api/v1/progress", require("./routers/progressRouter"));
app.use("/api/v1/blog", require("./routers/blogRouter"));



app.listen(port, () => {
  connectDb();
  console.log(`app listen ${port}`);
});
