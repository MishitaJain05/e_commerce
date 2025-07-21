const bcrypt = require("bcrypt");

exports.hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashed = await bcrypt.hash(password, saltRounds);
    return hashed;
  } catch (err) {
    console.error("Error hashing password:", err);
    throw err;
  }
};

exports.comparePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (err) {
    console.error("Error comparing password:", err);
    throw err;
  }
};
