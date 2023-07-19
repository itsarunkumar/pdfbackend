const router = require("express").Router();
const userController = require("../controllers/userController");

const { authenticateToken } = require("../utils/jwtAuth");

router.post("/user/create", userController.createUser);
router.get("/user/:id", authenticateToken, userController.getUserById);
router.post("/user/login", userController.loginUser);

module.exports = router;
