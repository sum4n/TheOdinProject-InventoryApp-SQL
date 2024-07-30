const asyncHandler = require("express-async-handler");

exports.allItemsGet = asyncHandler(async (req, res) => {
  res.render("pages/items", {
    title: "Items",
  });
});

exports.allSlotsGet = asyncHandler(async (req, res) => {
  res.render("pages/slots", {
    title: "Slots",
  });
});

exports.allItemTypesGet = asyncHandler(async (req, res) => {
  res.render("pages/item_types", {
    title: "Item Types",
  });
});
