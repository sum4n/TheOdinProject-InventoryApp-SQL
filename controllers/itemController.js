const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const db = require("../db/itemQueries");
const dbSlot = require("../db/slotQueries");
const dbItemType = require("../db/itemTypeQueries");

const isLetterHyphenApostrophe = (value) => {
  return /^[A-Za-z\s'-]+$/.test(value);
};
// Custom validation to allow only 251 or 264
const isNumber251Or264 = (value) => {
  return value === "251" || value === "264";
};
// Custom validation function to check if URL is an image
const isImageUrl = (value) => {
  // Check if URL is valid and ends with common image file extensions
  const imageUrlRegex = /\.(jpg|jpeg|png|gif)$/i;
  return imageUrlRegex.test(value);
};
const validateItemFormData = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Name must be between 1 - 50 characters")
    .custom(isLetterHyphenApostrophe)
    .withMessage(
      "Item type name can only include a-z characters, hyphen and apostrophe."
    ),
  body("slot_id").trim().isInt({ min: 0 }).withMessage("Choose correct slot."),
  body("item_type_id")
    .trim()
    .isInt({ min: 0 })
    .withMessage("Choose correct item type."),
  body("ilvl")
    .trim()
    .custom(isNumber251Or264)
    .withMessage("Choose correct item level from the list."),
  body("description")
    .trim()
    .optional()
    .isString()
    .isLength({ max: 200 })
    .withMessage("Description can only contain 200 characters"),
  body("image_url")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Image URL must be a valid URL")
    // This custom validation approach handles optional fields.
    // Use it everywhere even when field is not optional.
    .custom((value) => (value ? isImageUrl(value) : true))
    .withMessage("Image URL must end with .jpg, .jpeg, .png, or .gif"),
];

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

exports.createItem_post = [
  validateItemFormData,
  asyncHandler(async (req, res) => {
    const { name, slot_id, item_type_id, ilvl, description, image_url } =
      req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors.
      const [allSlots, allItemTypes] = await Promise.all([
        dbSlot.getAllSlots(),
        dbItemType.getAllItemTypes(),
      ]);
      const item = {
        name,
        slot_id,
        item_type_id,
        ilvl,
        description,
        image_url,
      };

      return res.status(400).render("pages/items/itemForm", {
        title: "Create an item",
        item,
        allSlots,
        allItemTypes,
        errors: errors.array(),
      });
    } else {
      // No errors. Save item.
      await db.insertItem(
        name,
        item_type_id,
        slot_id,
        ilvl,
        description,
        image_url
      );
      res.redirect("/items");
    }
  }),
];

exports.updateItem_get = asyncHandler(async (req, res) => {
  const [item, allSlots, allItemTypes] = await Promise.all([
    db.getItem(req.params.id),
    dbSlot.getAllSlots(),
    dbItemType.getAllItemTypes(),
  ]);

  res.render("pages/items/itemForm", {
    title: "Create an item",
    item,
    allSlots,
    allItemTypes,
  });
});

exports.updateItem_post = [
  validateItemFormData,
  asyncHandler(async (req, res) => {
    const { name, slot_id, item_type_id, ilvl, description, image_url } =
      req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors.
      const [allSlots, allItemTypes] = await Promise.all([
        dbSlot.getAllSlots(),
        dbItemType.getAllItemTypes(),
      ]);
      const item = {
        name,
        slot_id,
        item_type_id,
        ilvl,
        description,
        image_url,
      };
      return res.status(400).render("pages/items/itemForm", {
        title: "Create an item",
        item,
        allSlots,
        allItemTypes,
        errors: errors.array(),
      });
    } else {
      // No errors. Update item.
      const item_id = req.params.id;
      await db.updateItem(
        item_id,
        name,
        item_type_id,
        slot_id,
        ilvl,
        description,
        image_url
      );
      res.redirect("/items");
    }
  }),
];

exports.deleteItem_get = asyncHandler(async (req, res) => {
  const item = await db.getItem(req.params.id);

  if (item == null) {
    res.redirect("/items");
    return;
  }

  res.render("pages/items/itemDelete", {
    title: "Delete Item",
    item,
  });
});

exports.deleteItem_post = asyncHandler(async (req, res) => {
  await db.deleteItem(req.params.id);
  res.redirect("/items");
});
