const express = require("express");
const controller = require("./settingsController");
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.get("/", controller.get);
router.get("/:settingActive", controller.get);
router.get("/:settingActive/:settingAction", controller.get);
router.post("/:settingActive/:settingAction", controller.postAdd);
router.get("/:settingActive/:settingAction/:id", controller.get);
router.post("/:settingActive/delete/:id", controller.postDelete);
router.post("/:settingActive/:settingAction/:id", controller.postUpdate);

module.exports = router;
