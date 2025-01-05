const mongoose = require("mongoose");

// Store Schema
const storeSchema = new mongoose.Schema({
  name: String,
  domain: String,
  ownerId: mongoose.Schema.Types.ObjectId,
  settings: {
    currency: String,
    language: String,
    timezone: String,
  },

  createdAt: Date,
  updatedAt: Date,
});

// User Schema
const userSchema = new mongoose.Schema({
  storeId: mongoose.Schema.Types.ObjectId,
  owner: Boolean,
  name: String,
  email: String,
  passwordHash: String,
  address: {
    line1: String,
    line2: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  createdAt: Date,
  updatedAt: Date,
});

//category of all products in thats store
const categorySchema = new mongoose.Schema({
  //it shoul work lookups for products
  storeId: mongoose.Schema.Types.ObjectId,
  Image: String,
  name: String,
  description: String,
  createdAt: Date,
  updatedAt: Date,
});

// Product Schema
const productSchema = new mongoose.Schema({
  storeId: mongoose.Schema.Types.ObjectId,
  name: String,
  description: String,
  price: Number,
  currency: String,
  sku: String,
  inventory: {
    stock: Number,
    lowStockThreshold: Number,
  },
  images: [String],
  categories: [String], //array of categoriesid ,
  tags: [String],
  variants: [
    {
      name: String,
      options: [String],
    },
  ],
  likes: Number,
  createdAt: Date,
  updatedAt: Date,
});

// Order Schema
const orderSchema = new mongoose.Schema({
  storeId: mongoose.Schema.Types.ObjectId,
  customerId: mongoose.Schema.Types.ObjectId,
  items: [
    {
      productId: mongoose.Schema.Types.ObjectId,
      quantity: Number,
      price: Number,
    },
  ],
  total: Number,
  currency: String,
  status: String,
  shippingAddress: {
    fullName: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  createdAt: Date,
  updatedAt: Date,
});

// Page Schema
const pageSchema = new mongoose.Schema({
  storeId: mongoose.Schema.Types.ObjectId,
  title: String,
  content: String,
  slug: String,
  visibility: Boolean,
  createdAt: Date,
  updatedAt: Date,
});

// Cart Schema
const cartSchema = new mongoose.Schema({
  storeId: mongoose.Schema.Types.ObjectId,
  customerId: mongoose.Schema.Types.ObjectId,
  items: [
    {
      productId: mongoose.Schema.Types.ObjectId,
      quantity: Number,
    },
  ],
  createdAt: Date,
  updatedAt: Date,
});

// Review Schema
const reviewSchema = new mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  customerId: mongoose.Schema.Types.ObjectId,
  rating: Number,
  comment: String,
  createdAt: Date,
  updatedAt: Date,
});

// Indexing
productSchema.index({ storeId: 1, name: 1 });
orderSchema.index({ storeId: 1, customerId: 1, status: 1 });
userSchema.index({ email: 1 }, { unique: true });
cartSchema.index({ customerId: 1 }, { unique: true });

// Export Models
module.exports = {
  Store: mongoose.model("Store", storeSchema),
  User: mongoose.model("User", userSchema),
  Product: mongoose.model("Product", productSchema),
  Order: mongoose.model("Order", orderSchema),
  Page: mongoose.model("Page", pageSchema),
  Cart: mongoose.model("Cart", cartSchema),
  Review: mongoose.model("Review", reviewSchema),
  category: mongoose.model("category", categorySchema),
};
