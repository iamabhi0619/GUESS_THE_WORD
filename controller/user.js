const User = require("../models/user");
const { v4: uuidv4 } = require('uuid');

exports.createUser = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = uuidv4();
    if (!name) {
      return res.status(400).json({ message: "userId and name are required" });
    }
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this userId already exists" });
    }
    const newUser = new User({ userId, name });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving user", error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findOneAndUpdate(
      { userId: req.params.userId },
      updates,
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

exports.getScore = async (req, res) => {
  try {
    const userId = req.params.userId;
    let user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const score = {
      score: user.score,
      points: user.points,
      questionsSolved: user.questionsSolved,
      currentRemainingHints: user.currentRemainingHints
    };
    return res.status(200).json({ ...score });
  } catch (error) {}
};

exports.getHistory = async (req, res) => {
  try {
    const userId = req.params.userId;
    let user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const history = user.questions;
    return res.status(200).json({ message: history });
  } catch (error) {
    
  }
}