const pool = require("./pool");

async function getAllSlots() {
  const { rows } = await pool.query("SELECT * FROM slots");
  return rows;
}

async function getSlot(id) {
  const { rows } = await pool.query("SELECT * FROM slots WHERE slot_id = $1", [
    id,
  ]);
  return rows[0];
}

async function insertSlot(slot_name, slot_price) {
  await pool.query("INSERT INTO slots(slot_name, slot_price) Values ($1, $2)", [
    slot_name,
    slot_price,
  ]);
}

async function updateSlot(slot_id, slot_name, slot_price) {
  await pool.query(
    "UPDATE slots SET slot_name = $1, slot_price = $2 WHERE slot_id = $3",
    [slot_name, slot_price, slot_id]
  );
}

async function deleteSlot(slot_id) {
  await pool.query("DELETE FROM slots WHERE slot_id = $1", [slot_id]);
}

async function getItemBySlot(slot_id) {
  const { rows } = await pool.query(
    "SELECT * FROM items JOIN slots ON slots.slot_id = items.slot_id WHERE items.slot_id = $1",
    [slot_id]
  );
  return rows;
}

module.exports = {
  getAllSlots,
  getSlot,
  insertSlot,
  updateSlot,
  deleteSlot,
  getItemBySlot,
};
