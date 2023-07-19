const bcrypt = require("bcrypt");

// Utility function to hash passwords
const hashPassword = async (password) => {
  try {
    const saltRounds = 10; // Number of salt rounds for bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    // Handle error if bcrypt encounters an issue
    console.error("Error hashing password:", error);
    throw new Error("Error hashing password");
  }
};

module.exports = hashPassword;
