const asyncHandler = require("express-async-handler");

exports.allItemsGet = asyncHandler(async (req, res) => {
  res.send("Get all info about the items: WIP");
});

exports.allSlotsGet = asyncHandler(async (req, res) => {
  res.send("Get all slots: WIP");
});

exports.allItemTypesGet = asyncHandler(async (req, res) => {
  res.send("Get all Item Types: WIP");
});
