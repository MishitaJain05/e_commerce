const express = require("express");
const authController = require("../controllers/authController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

const authRouter = express.Router();

authRouter.post("/signup", authController.SignUp);
authRouter.post("/signin", authController.SignIn);
// authRouter.post("/signout", authController.SignOut);

authRouter.get(
  "/admin/dashboard",
  requireSignIn,
  isAdmin,
  authController.AdminController
);

authRouter.get("/user/dashboard", requireSignIn, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

module.exports = { authRouter };
