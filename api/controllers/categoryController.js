const { category } = require("../models/model");

exports.createCategory = async (req, res) => {
  try {
    const { name, description, Image } = req.body;

    if (!name || !description) {
      return res
        .status(400)
        .json({ error: "Name and description are required." });
    }
    const newCategory = new category({
      name,
      description,
      Image,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(500).json({
      error: "Failed to create category. Please try again later." + err,
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await category.find();
    res.status(200).json(categories);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch categories. Please try again later." });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedCategory = await category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedCategory);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update category. Please try again later." });
  }
};

exports.deleteCategory = async (req, res) => {

  try {
    const { id } = req.params;

    await category.findByIdAndDelete(id);
    res.status(204).json();
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete category. Please try again later." });
  }
};

