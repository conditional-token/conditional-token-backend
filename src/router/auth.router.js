const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");
const authMiddleware = require("./auth.middleware");

router.post("/signup", authMiddleware, authController.signup);
router.post("/login", authMiddleware, authController.login);

module.exports = router;
