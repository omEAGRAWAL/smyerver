const express = require("express");
const {
  createProduct,
  getProducts,
  updateProducts,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.put("/:id", updateProducts);
router.delete("/:id", deleteProduct);

module.exports = router;
