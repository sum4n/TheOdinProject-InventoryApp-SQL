const pool = require("./pool");

async function getAllItemTypes() {
  const { rows } = await pool.query("SELECT * FROM item_types");
  return rows;
}

async function getItemType(id) {
  const { rows } = await pool.query(
    "SELECT * FROM item_types WHERE item_type_id = $1",
    [id]
  );
  return rows[0];
}

async function insertItemType(type_name) {
  await pool.query("INSERT INTO item_types(type_name) VALUES ($1)", [
    type_name,
  ]);
}

async function updateItemType(item_type_id, type_name) {
  await pool.query(
    "UPDATE item_types SET type_name = $1 WHERE item_type_id = $2",
    [type_name, item_type_id]
  );
}

async function deleteItemType(item_type_id) {
  await pool.query("DELETE FROM item_types WHERE item_type_id = $1", [
    item_type_id,
  ]);
}

async function getItemsByItemType(item_type_id) {
  const { rows } = await pool.query(
    "SELECT * FROM item_types JOIN items ON item_types.item_type_id = items.item_type_id WHERE item_types.item_type_id = $1",
    [item_type_id]
  );
  return rows;
}

module.exports = {
  getAllItemTypes,
  getItemType,
  insertItemType,
  updateItemType,
  deleteItemType,
  getItemsByItemType,
};
