const { Store } = require("../models/model");

// Get all stores
exports.getStores = async (req, res) => {
  try {
    const stores = await Store.find();
    console.log(stores);
    
    res.status(200).json(stores);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch stores. Please try again later." });
  }
};

// Create a new store
exports.createStore = async (req, res) => {
  try {
    const { name, domain, ownerId, settings } = req.body;

    // Basic validation
    if (!name || !domain || !ownerId) {
      return res
        .status(400)
        .json({ error: "Name, domain, and ownerId are required." });
    }

    const newStore = new Store({
      name,
      domain,
      ownerId,
      settings,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const savedStore = await newStore.save();
    res.status(201).json(savedStore);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create store. Please try again later." + err });
  }
};

// Update a store
exports.updateStore = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the store exists
    const store = await Store.findById(id);
    if (!store) {
      return res.status(404).json({ error: "Store not found." });
    }

    const updatedStore = await Store.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedStore);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update store. Please try again later." });
  }
};

// Delete a store
exports.deleteStore = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the store exists
    const store = await Store.findById(id);
    if (!store) {
      return res.status(404).json({ error: "Store not found." });
    }

    await Store.findByIdAndDelete(id);
    res.status(200).json({ message: "Store deleted successfully." });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete store. Please try again later." });
  }
};
