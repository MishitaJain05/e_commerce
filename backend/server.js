//external imports
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

//local imports
const { connectDB } = require("./config/db");
const { authRouter } = require("./routes/authRoute");

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
connectDB();

app.use("/api/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log(`App running on http://localhost:${process.env.PORT}`);
});
