const express = require("express");
const controller = require("./settingsController");
const router = express.Router();

router.get("/", controller.get);
router.get("/:settingActive", controller.get);
router.get("/:settingActive/:action", controller.get);

module.exports = router;
