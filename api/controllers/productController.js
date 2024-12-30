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

//update
exports.updateProducts = async (req, res) => {
  const _id = req.params.id;

  const {
    // _id,
    storeId,
    name,
    description,
    price,
    images,
    categories,
    tags,
    variants,
  } = req.body;

  try {
    if (!_id) {
      return res.status(400).json({ error: "Product ID is required." });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      _id,
      {
        storeId,
        name,
        description,
        price,
        images,
        categories,
        tags,
        variants,
        updatedAt: new Date(),
      },
      { new: true } // Returns the updated product
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error("Error updating product:", err);
    res
      .status(500)
      .json({ error: "Failed to update product. Please try again later." });
  }
};

exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;

  //request url  /api/products/:id

  try {
    if (!productId) {
      return res.status(400).json({ error: "Product ID is required." });
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json({ message: "Product successfully deleted." });
  } catch (err) {
    console.error("Error deleting product:", err);
    res
      .status(500)
      .json({ error: "Failed to delete product. Please try again later." });
  }
};
