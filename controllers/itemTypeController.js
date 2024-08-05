const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const db = require("../db/itemTypeQueries");

const isLetterHyphenApostrophe = (value) => {
  return /^[A-Za-z\s'-]+$/.test(value);
};
const validateItemTypeData = [
  body("type_name")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Item type name must be between 1 - 50 characters")
    .custom(isLetterHyphenApostrophe)
    .withMessage(
      "Item type name can only include a-z characters, hyphen and apostrophe."
    ),
];

exports.listItemTypes = asyncHandler(async (req, res) => {
  let itemTypes = await db.getAllItemTypes();
  res.render("pages/item_types/itemTypes", {
    title: "Item Types",
    itemTypes,
  });
});

exports.getItemType = asyncHandler(async (req, res) => {
  let itemType = await db.getItemType(req.params.id);
  res.render("pages/item_types/itemTypeDescription", {
    title: "Item Type Description",
    itemType,
  });
});

exports.createItemType_get = asyncHandler(async (req, res) => {
  res.render("pages/item_types/itemTypeForm", {
    title: "Create Item Type",
  });
});

exports.createItemType_post = [
  validateItemTypeData,
  asyncHandler(async (req, res) => {
    const type_name = req.body.type_name;
    const itemType = { type_name };

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("pages/item_types/itemTypeForm", {
        title: "Create Item Type",
        itemType,
        errors: errors.array(),
      });
    }

    await db.insertItemType(type_name);
    res.redirect("/item_types");
  }),
];

exports.updateItemType_get = asyncHandler(async (req, res) => {
  let itemType = await db.getItemType(req.params.id);
  res.render("pages/item_types/itemTypeForm", {
    title: "Update Item Type",
    itemType,
  });
});

exports.updateItemType_post = [
  validateItemTypeData,
  asyncHandler(async (req, res) => {
    const type_name = req.body.type_name;
    const itemType = { type_name };

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("pages/item_types/itemTypeForm", {
        title: "Update Item Type",
        itemType,
        errors: errors.array(),
      });
    }

    // Don't get id from body, it can be changed by making the input field visible.
    const id = req.params.id;
    await db.updateItemType(id, type_name);
    res.redirect(`/item_types/${id}`);
  }),
];

exports.deleteItemType_get = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const [itemType, items] = await Promise.all([
    db.getItemType(id),
    db.getItemsByItemType(id),
  ]);

  if (itemType == null) {
    res.redirect("/item_types");
    return;
  }

  res.render("pages/item_types/itemTypeDelete", {
    title: "Delete Item Type",
    itemType,
    items,
  });
});

exports.deleteItemType_post = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const [itemType, items] = await Promise.all([
    db.getItemType(id),
    db.getItemsByItemType(id),
  ]);

  if (items.length > 0) {
    res.render("pages/item_types/itemTypeDelete", {
      title: "Delete Item Type",
      itemType,
      items,
    });
    return;
  } else {
    await db.deleteItemType(id);
    res.redirect("/item_types");
  }
});
