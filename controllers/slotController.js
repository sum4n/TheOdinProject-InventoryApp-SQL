const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const db = require("../db/slotQueries");

const isLetterHyphenApostrophe = (value) => {
  return /^[A-Za-z\s'-]+$/.test(value);
};
const validateSlotData = [
  body("slot_name")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Slot name must be between 1 - 50 characters.")
    .custom(isLetterHyphenApostrophe)
    .withMessage(
      "Slot name can only include a-z characters, hyphen and apostrophe."
    ),
  body("slot_price")
    .trim()
    .isInt({ min: 0, max: 90 })
    .withMessage("Price must be a positive integer between 0-90"),
];

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

exports.createSlot_post = [
  validateSlotData,
  asyncHandler(async (req, res) => {
    const { slot_name, slot_price } = req.body;
    const slot = {
      slot_name,
      slot_price,
    };

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("pages/slots/slotForm", {
        title: "Create Slot",
        slot,
        errors: errors.array(),
      });
    }

    await db.insertSlot(slot_name, slot_price);
    res.redirect("/slots");
  }),
];

exports.updateSlot_get = asyncHandler(async (req, res) => {
  const slot = await db.getSlot(req.params.id);
  res.render("pages/slots/slotForm", {
    title: "Update slot",
    slot,
  });
});

exports.updateSlot_post = [
  validateSlotData,
  asyncHandler(async (req, res) => {
    // Don't get id form body, it can be changed.
    const slot_id = req.params.id;
    const { slot_name, slot_price } = req.body;

    const slot = {
      slot_name,
      slot_price,
    };

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("pages/slots/slotForm", {
        title: "Update slot",
        slot,
        errors: errors.array(),
      });
    }

    await db.updateSlot(slot_id, slot_name, slot_price);
    res.redirect(`/slots/${slot_id}`);
  }),
];

exports.deleteSlot_get = asyncHandler(async (req, res) => {
  const [slot, items] = await Promise.all([
    db.getSlot(req.params.id),
    db.getItemBySlot(req.params.id),
  ]);

  if (slot == null) {
    res.redirect("/slots");
    return;
  }

  res.render("pages/slots/slotDelete", {
    title: "Delete slot",
    items,
    slot,
  });
});

exports.deleteSlot_post = asyncHandler(async (req, res) => {
  const [slot, items] = await Promise.all([
    db.getSlot(req.params.slot_id),
    db.getItemBySlot(req.params.slot_id),
  ]);

  if (items.length > 0) {
    res.render("pages/slots/slotDelete", {
      title: "Delete slot",
      items,
      slot,
    });
    return;
  } else {
    await db.deleteSlot(req.params.id);
    res.redirect("/slots");
  }
});
