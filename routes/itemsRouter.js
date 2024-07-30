const { Router } = require("express");
const itemsController = require("../controllers/itemsController");

const router = Router();

router.get("/items", itemsController.allItemsGet);

router.get("/slots", itemsController.allSlotsGet);

router.get("/item-types", itemsController.allItemTypesGet);

module.exports = router;
