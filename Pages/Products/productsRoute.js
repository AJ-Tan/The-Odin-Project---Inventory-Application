const express = require("express");
const controller = require("./productsController");
const router = express.Router();

router.get("/", controller.get);

module.exports = router;
