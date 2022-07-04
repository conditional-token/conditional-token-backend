const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");
const authMiddleware = require("./auth.middleware");

router.post("/signup", authMiddleware, authController.signup);
router.get("/login", authMiddleware, authController.login);

module.exports = router;
