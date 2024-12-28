const { Product } = require("../models/model.js");
// storeId: mongoose.Schema.Types.ObjectId,
//   name: String,
//   description: String,
//   price: Number,
//   currency: String,
//   sku: String,
//   inventory: {
//     stock: Number,
//     lowStockThreshold: Number
//   },
//   images: [String],
//   categories:[mongoose.Schema.Types.ObjectId]  , //array of categoriesid ,
//   tags: [String],
//   variants: [
//     {
//       name: String,
//       options: [String]
//     }
//   ],
//   createdAt: Date,
//   updatedAt: Date
// });

exports.createProduct = async (req, res) => {
  try {
    const {
      storeId,
      name,
      description,
      price,
      currency,
      sku,
      inventory,
      images,
      categories,
      tags,
      variants,
    } = req.body;

    // Basic validation
    if (!storeId || !name || !price) {
      return res
        .status(400)
        .json({ error: "storeId, name, price, and currency are required." });
    }

    const newProduct = new Product({
      storeId,
      name,
      description,
      price,
      currency,
      sku,
      inventory,
      images,
      categories,
      tags,
      variants,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create product. Please try again later." });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  const storeid = req.query.storeid;
  // console.log(storeid);
  // console.log(req.body);
  console.log(req.query.storeid);
  try {
    const products = await Product.find({ storeId: storeid });
    // console.log(products);
    res.status(200).json(products);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to get products. Please try again later." });
  }
};
