const asyncHandler = require("express-async-handler");

exports.listSlots = asyncHandler(async (req, res) => {
  res.send("Slot list page (WIP)");
});

exports.getSlot = asyncHandler(async (req, res) => {
  res.send("Get slot page (WIP)");
});

exports.createSlot_get = asyncHandler(async (req, res) => {
  res.send("Create slot page GET (WIP)");
});

exports.createSlot_post = asyncHandler(async (req, res) => {
  res.send("Create slot page POST (WIP)");
});

exports.updateSlot_get = asyncHandler(async (req, res) => {
  res.send("Slot update page GET (WIP)");
});

exports.updateSlot_post = asyncHandler(async (req, res) => {
  res.send("Slot update page POST (WIP)");
});

exports.deleteSlot_get = asyncHandler(async (req, res) => {
  res.send("Slot delete page GET (WIP)");
});

exports.deleteSlot_post = asyncHandler(async (req, res) => {
  res.send("Slot delete page POST (WIP)");
});
