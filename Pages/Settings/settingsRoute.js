const express = require("express");
const controller = require("./settingsController");
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.get("/", controller.get);
router.post("/misc/", controller.postReset);
router.get("/:content/", controller.get);
router.get("/:content/:id", controller.get);
router.post("/:content", controller.postAdd);
router.post("/:content/:id", controller.postUpdate);
router.post("/:content/delete/:id", controller.postDelete);

module.exports = router;
