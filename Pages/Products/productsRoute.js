const express = require("express");
const controller = require("./productsController");
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.get("/", controller.get);
router.get("/:content", controller.get);
router.get("/:content/:id", controller.get);
router.post("/:content/", controller.postAdd);
router.post("/delete/:id", controller.postDelete);
router.post("/:content/:id", controller.postUpdate);

module.exports = router;
