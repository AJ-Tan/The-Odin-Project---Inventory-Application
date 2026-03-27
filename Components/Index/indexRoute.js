const express = require("express");
const controller = require("./indexController");
const router = express.Router();

router.get("/", controller.get);

module.exports = router;
