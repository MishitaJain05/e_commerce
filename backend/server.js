//external imports
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const authRouter = require("./routes/authRoute");
const categoryRouter = require("./routes/categoryRoute");
const productRouter = require("./routes/productRoute");

//local imports
const { connectDB } = require("./config/db");
dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
connectDB();

app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);

app.listen(process.env.PORT, () => {
  console.log(`App running on http://localhost:${process.env.PORT}`);
});
