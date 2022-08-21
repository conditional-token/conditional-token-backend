const express = require("express");
const router = express.Router();
const contractController = require("../controller/contract.controller");

router.get("/address", contractController.getAddress);
router.get("/abi",  contractController.getAbi);

module.exports = router;
