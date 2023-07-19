const prisma = require("../prisma/client");
const handleAsync = require("../utils/asyncontrol");
const hashPassword = require("../utils/hasPassword");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.createUser = handleAsync(async (req, res) => {
  const { name, email, password } = req.body;

  // Hash the password
  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  res.json(user);
});

exports.getUserById = handleAsync(async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  res.json(user);
});

exports.loginUser = handleAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Compare the password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid password" });
  }

  // Create a JWT token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.json({ token, user });
});
