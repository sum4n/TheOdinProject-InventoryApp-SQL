const asyncHandler = require("express-async-handler");

exports.listItemTypes = asyncHandler(async (req, res) => {
  res.send("List all Item Types (WIP)");
});

exports.getItemType = asyncHandler(async (req, res) => {
  res.send("Get single Item Type (WIP)");
});

exports.createItemType_get = asyncHandler(async (req, res) => {
  res.send("Create Item Type GET (WIP)");
});

exports.createItemType_post = asyncHandler(async (req, res) => {
  res.send("Create Item Type POST (WIP)");
});

exports.updateItemType_get = asyncHandler(async (req, res) => {
  res.send("Update Item Type GET (WIP)");
});

exports.updateItemType_post = asyncHandler(async (req, res) => {
  res.send("Update Item Type POST (WIP)");
});

exports.deleteItemType_get = asyncHandler(async (req, res) => {
  res.send("Delete Item Type GET (WIP)");
});

exports.deleteItemType_post = asyncHandler(async (req, res) => {
  res.send("Delete Item Type POST (WIP)");
});
