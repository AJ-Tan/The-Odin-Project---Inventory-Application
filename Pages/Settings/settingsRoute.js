const express = require("express");
const controller = require("./settingsController");
const router = express.Router();

router.get("/", controller.get);

module.exports = router;
