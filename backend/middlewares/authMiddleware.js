const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel");

exports.requireSignIn = async (req, res, next) => {
  try {
    let token = null;

    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1]; // Bearer token
    } else if (req.query.Authorization) {
      token = req.query.Authorization; // fallback to query param
    }

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "Invalid or expired token" });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user || !user.isAdmin) {
      return res.status(401).send({ message: "Unauthorized Access" });
    }
    next();
  } catch (error) {
    console.error("isAdmin error:", error.message);
    res.status(401).send({ message: "Error in admin middleware" });
  }
};
