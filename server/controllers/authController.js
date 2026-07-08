const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check empty fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );

    return res.status(200).json({
        success: true,
        message: "Login successful",
        token,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Protected Route Accessed",
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  signup,
  login,
  getProfile,
};