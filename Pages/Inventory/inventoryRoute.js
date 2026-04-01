const express = require("express");
const controller = require("./inventoryController");
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.get("/", controller.get);
router.get("/:content", controller.get);
router.get("/:content/:product_id/:warehouse_id", controller.get);
router.post("/:content/", controller.postAdd);
router.post("/delete/:product_id/:warehouse_id", controller.postDelete);
router.post("/:content/:product_id/:warehouse_id", controller.postUpdate);

module.exports = router;
