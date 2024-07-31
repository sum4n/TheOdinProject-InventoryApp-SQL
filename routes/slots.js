const express = require("express");
const router = express.Router();

const slotController = require("../controllers/slotController");

router.get("/", slotController.listSlots);
router.get("/:id", slotController.getSlot);
router.get("/create", slotController.createSlot_get);
router.post("/create", slotController.createSlot_post);
router.get("/:id/update", slotController.updateSlot_get);
router.post("/:id/update", slotController.updateSlot_post);
router.get("/:id/delete", slotController.deleteSlot_get);
router.post("/:id/delete", slotController.deleteSlot_post);

module.exports = router;
