const asyncHandler = require("express-async-handler");
const db = require("../db/itemQueries");

exports.listItems = asyncHandler(async (req, res) => {
  const items = await db.getAllItems();
  res.render("pages/items/items", {
    title: "Items List",
    items,
  });
});

exports.getItem = asyncHandler(async (req, res) => {
  const item = await db.getItem(req.params.id);
  res.render("pages/items/itemDescription", {
    title: "Item Description",
    item,
  });
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
