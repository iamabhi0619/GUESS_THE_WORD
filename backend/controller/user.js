const { default: axios } = require("axios");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

const serviceId = "S0001";
const serviceName = "GUESS THE WORD";

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // const userId = uuidv4();
    const response = await axios.post(`${process.env.API_URL}/api/user/login`, {
      email,
      password,
      serviceId,
      serviceName,
    });
    if (!response.data.success) {
      console.log("i am not here");
      
      return res.json(response.data);
    }
    const { token } = response.data;
    const decoded = jwt.verify(token, process.env.SECRET);
    const userData = await axios.get(
      `${process.env.API_URL}/api/user/profile`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!userData.data.isVerified) {
      return res.json({
        success: false,
        message: "Please verify Your Email..!!",
      });
    }
    const existingUser = await User.findOne({ userId: decoded.userId });
    if (existingUser) {
      return res
        .status(200)
        .json({success:true, message: "User LogedIn successfully", user: existingUser });
    }
    const newUser = new User({
      userId: userData.data.userId,
      name: userData.data.name,
      avatar: userData.data.avatar,
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User LogedIn successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json(error.response.data);
  }
};

exports.createuser = async (req, res) => {
  try {
    const { userId, name, email, password, gender } = req.body;
    if (!name || !email || !password || !gender) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const user = await User.findOne({ userId });
    if (user) {
      res.status(200).json({ message: "Your are alrady an User...!!" });
    }
    const response = await axios.post(
      `${process.env.API_URL}/api/user/register`,
      { name, email, password, gender, serviceId, serviceName }
    );
    console.log(response.data);
    if (response.data.success) {
      res.status(201).json(response.data);
    }
  } catch (error) {
    res.json(error.response.data);
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
      currentRemainingHints: user.currentRemainingHints,
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
  } catch (error) {}
};
