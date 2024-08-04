const pool = require("./db");

async function getAllItems() {
  const { rows } = await pool.query(
    "SELECT * FROM items JOIN slots ON slots.slot_id=items.slot_id JOIN item_types ON item_types.item_type_id=items.item_type_id"
  );
  return rows;
}

async function getItem(id) {
  const { rows } = await pool.query(
    "SELECT * FROM items JOIN slots ON slots.slot_id=items.slot_id JOIN item_types ON item_types.item_type_id=items.item_type_id WHERE items.item_id=($1)",
    [id]
  );
  return rows[0];
}

async function insertItem(
  name,
  item_type_id,
  slot_id,
  ilvl,
  description,
  image_url
) {
  await pool.query(
    "INSERT INTO items(name, item_type_id, slot_id, ilvl, description, image_url) VALUES ($1, $2, $3, $4, $5, $6)",
    [name, item_type_id, slot_id, ilvl, description, image_url]
  );
}

async function updateItem(
  id,
  name,
  item_type_id,
  slot_id,
  ilvl,
  description,
  image_url
) {
  await pool.query(
    "UPDATE items SET name = $1, item_type_id = $2, slot_id = $3, ilvl = $4, description = $5, image_url = $6 WHERE item_id = $7",
    [name, item_type_id, slot_id, ilvl, description, image_url, id]
  );
}

async function deleteItem(id) {
  await pool.query("DELETE FROM items WHERE item_id = $1", [id]);
}

module.exports = {
  getAllItems,
  getItem,
  insertItem,
  updateItem,
  deleteItem,
};
