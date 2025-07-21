const userModel = require("../models/userModel");
const JWT = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../utils/authUtil");

exports.SignUp = async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  // Validate input
  if (!name || !email || !password || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if user already exists
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  hashed_pass = await hashPassword(password);
  const user = new userModel({
    name: name,
    email: email,
    password: hashed_pass,
    phone: phone,
    address: address,
    isAdmin: false,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.SignIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("SignIn request received for:", email);

    let user;
    try {
      user = await userModel.findOne({ email });
    } catch (findErr) {
      console.error(" Error during user lookup:", findErr);
      return res.status(500).json({ message: "DB lookup failed" });
    }

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      console.log("Invalid password");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "Sign in successful",
      token,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    console.error("SignIn error:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.AdminController = (req, res) => {
  try {
    res.status(200).send({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

// exports.SignOut = async (req, res) => {
//   try {

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// }
