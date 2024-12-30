const express = require("express");
const storeRoutes = require("./routes/storeRoutes");
const uploadProduct = require("./routes/uploadProduct");
const ownerRoutes = require("./routes/ownerRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();

// Middleware
app.use(express.json());
//cors
const cors = require("cors");

// //make it accept from all locations
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

// Routes
app.use("/api/stores", storeRoutes);
app.use("/api/upload", uploadProduct);
app.use("/api", ownerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

module.exports = app;
