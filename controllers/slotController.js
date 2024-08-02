const asyncHandler = require("express-async-handler");
const db = require("../db/slotQueries");

exports.listSlots = asyncHandler(async (req, res) => {
  const slots = await db.getAllSlots();
  res.render("pages/slots/slots", {
    title: "Slots list",
    slots,
  });
});

exports.getSlot = asyncHandler(async (req, res) => {
  const slot = await db.getSlot(req.params.id);
  res.render("pages/slots/slotDescription", {
    title: "Slot Description",
    slot,
  });
});

exports.createSlot_get = asyncHandler(async (req, res) => {
  res.render("pages/slots/slotForm", {
    title: "Create Slot",
  });
});

exports.createSlot_post = asyncHandler(async (req, res) => {
  const { slot_name, slot_price } = req.body;
  await db.insertSlot(slot_name, slot_price);
  res.redirect("/slots");
});

exports.updateSlot_get = asyncHandler(async (req, res) => {
  const slot = await db.getSlot(req.params.id);
  res.render("pages/slots/slotForm", {
    title: "Update slot",
    slot,
  });
});

exports.updateSlot_post = asyncHandler(async (req, res) => {
  const { slot_id, slot_name, slot_price } = req.body;
  // console.log(slot_id, slot_name, slot_price);
  await db.updateSlot(slot_id, slot_name, slot_price);
  res.redirect(`/slots/${slot_id}`);
});

exports.deleteSlot_get = asyncHandler(async (req, res) => {
  res.send("Slot delete page GET (WIP)");
});

exports.deleteSlot_post = asyncHandler(async (req, res) => {
  res.send("Slot delete page POST (WIP)");
});
