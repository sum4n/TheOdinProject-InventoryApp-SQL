const express = require("express");
const router = express.Router();

const itemTypeController = require("../controllers/itemTypeController");

router.get("/", itemTypeController.listItemTypes);

router.get("/create", itemTypeController.createItemType_get);
router.post("/create", itemTypeController.createItemType_post);

router.get("/:id", itemTypeController.getItemType);

router.get("/:id/update", itemTypeController.updateItemType_get);
router.post("/:id/update", itemTypeController.updateItemType_post);
router.get("/:id/delete", itemTypeController.deleteItemType_get);
router.post("/:id/delete", itemTypeController.deleteItemType_post);

module.exports = router;
