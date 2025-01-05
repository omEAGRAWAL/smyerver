const { User } = require("../models/model");
const bcrypt = require("bcryptjs");

// Owner sign up

exports.ownerSignUp = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone, address,owner } = req.body;

    // Basic validation
    if (!email || !password || !firstName || !phone) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if the email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ error: "Email already exists." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone,
      address,
      role: "owner",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create user. Please try again later."+err });
  }
};

// Owner sign in
exports.ownerSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if the email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to sign in. Please try again later." });
  }
};

// Get owner profile
exports.getOwnerProfile = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to get user. Please try again later." });
  }
};

// Update owner profile
exports.updateOwnerProfile = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    const updatedUser = await User.findById(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update user. Please try again later." });
  }
};
