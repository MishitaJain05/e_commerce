const JWT = require("jsonwebtoken");

//Protected Routes token base
exports.requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Remove "Bearer"
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log("JWT error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.isAdmin !== true) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};
