const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel");

// Middleware to verify token
exports.requireSignIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    // console.log(req.headers)

    if (!authHeader) {
      // console.log("no token")
      return res.status(401).json({ message: "No token provided" });
    }

    // const token = authHeader.split(" ")[1]; // Extract token
    const decoded = JWT.verify(authHeader, process.env.JWT_SECRET);

    req.user = decoded; // Attach decoded data (_id) to req.user
    next();
  } catch (error) {
    console.error("requireSignIn error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Middleware to check if user is admin
exports.isAdmin = async (req, res, next) => {
  try {
    // console.log(req.user)
    const user = await userModel.findById(req.user._id);
    // console.log(user)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isAdmin) {
      return res.status(403).json({ message: "Unauthorized Access" });
    }

    next();
  } catch (error) {
    console.error("isAdmin error:", error.message);
    return res.status(500).json({ message: "Error in admin middleware" });
  }
};
