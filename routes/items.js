const express = require("express");
const router = express.Router();

const itemController = require("../controllers/itemController");

router.get("/", itemController.listItems);
router.get("/:id", itemController.getItem);
router.get("/create", itemController.createItem_get);
router.post("/create", itemController.createItem_post);
router.get("/:id/update", itemController.updateItem_get);
router.post("/:id/update", itemController.updateItem_post);
router.get("/:id/delete", itemController.deleteItem_get);
router.post("/:id/delete", itemController.deleteItem_post);

module.exports = router;
