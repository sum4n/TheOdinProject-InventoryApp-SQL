const asyncHandler = require("express-async-handler");

exports.listItems = asyncHandler(async (req, res) => {
  res.send("Item lists page (WIP)");
});

exports.getItem = asyncHandler(async (req, res) => {
  res.send("Get item page (WIP)");
});

exports.createItem_get = asyncHandler(async (req, res) => {
  res.send("Create item page GET (WIP)");
});

exports.createItem_post = asyncHandler(async (req, res) => {
  res.send("Create item page POST (WIP)");
});

exports.updateItem_get = asyncHandler(async (req, res) => {
  res.send("Update item page GET (WIP)");
});

exports.updateItem_post = asyncHandler(async (req, res) => {
  res.send("Update item page POST (WIP)");
});

exports.deleteItem_get = asyncHandler(async (req, res) => {
  res.send("Delete item page GET (WIP)");
});

exports.deleteItem_post = asyncHandler(async (req, res) => {
  res.send("Delete item page POST (WIP)");
});
