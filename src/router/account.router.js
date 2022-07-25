const express = require("express");
const router = express.Router();
const accountController = require("../controller/account.controller");
const authMiddleware = require("./auth.middleware");

router.post("/", authMiddleware, accountController.upsertAccount);
router.get("/", authMiddleware, accountController.getAccount);

module.exports = router;
