const asyncHandler = require("express-async-handler");
const db = require("../db/itemQueries");
const dbSlot = require("../db/slotQueries");
const dbItemType = require("../db/itemTypeQueries");

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
  const [allSlots, allItemTypes] = await Promise.all([
    dbSlot.getAllSlots(),
    dbItemType.getAllItemTypes(),
  ]);

  res.render("pages/items/itemForm", {
    title: "Create an item",
    allSlots,
    allItemTypes,
  });
});

exports.createItem_post = asyncHandler(async (req, res) => {
  const { name, slot_id, item_type_id, ilvl, description, image_url } =
    req.body;
  await db.insertItem(
    name,
    item_type_id,
    slot_id,
    ilvl,
    description,
    image_url
  );
  res.redirect("/items");
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
