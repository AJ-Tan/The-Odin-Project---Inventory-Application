const express = require("express");
const controller = require("./errorController");
const router = express.Router();

router.use(controller.default);

module.exports = router;
