const pool = require("../../../models/pool");

const getAllInventory = async () => {
  const { rows } =
    await pool.query(`SELECT i.product_id, i.warehouse_id, p.name product, w.name warehouse, w.location location, email, phone, quantity FROM inventory_application.inventory i 
    JOIN inventory_application.products p ON product_id = p.id 
    JOIN inventory_application.warehouse w ON warehouse_id = w.id
    WHERE p.status='active' AND w.status='active'
    ORDER BY product_id ASC, warehouse_id ASC`);

  return rows;
};

const getSelectedInventory = async (product_id, warehouse_id) => {
  const { rows } = await pool.query(
    `SELECT * FROM inventory_application.inventory
    WHERE product_id=$1 AND warehouse_id=$2`,
    [product_id, warehouse_id],
  );
  return rows[0];
};

const getAllProducts = async () => {
  const { rows } = await pool.query(
    `SELECT * FROM inventory_application.products WHERE status='active' ORDER BY name ASC`,
  );
  return rows;
};

const getAllWarehouse = async () => {
  const { rows } = await pool.query(
    `SELECT * FROM inventory_application.warehouse WHERE status='active' ORDER BY name ASC`,
  );
  return rows;
};

const insertInventory = async (product_id, warehouse_id, quantity) => {
  await pool.query(
    `INSERT INTO inventory_application.inventory 
    (product_id, warehouse_id, quantity) 
    VALUES 
    ($1, $2, $3)`,
    [product_id, warehouse_id, quantity],
  );
};

const updateAddInventory = async (product_id, warehouse_id, quantity) => {
  await pool.query(
    `UPDATE inventory_application.inventory SET quantity=quantity + $3
    WHERE product_id=$1 AND warehouse_id=$2`,
    [product_id, warehouse_id, quantity],
  );
};

const updateInventory = async (product_id, warehouse_id, quantity) => {
  await pool.query(
    `UPDATE inventory_application.inventory SET quantity=$3
    WHERE product_id=$1 AND warehouse_id=$2`,
    [product_id, warehouse_id, quantity],
  );
};

const deleteInventory = async (product_id, warehouse_id) => {
  await pool.query(
    `DELETE FROM inventory_application.inventory
    WHERE product_id=$1 AND warehouse_id=$2`,
    [product_id, warehouse_id],
  );
};

module.exports = {
  getAllInventory,
  getSelectedInventory,
  getAllProducts,
  getAllWarehouse,
  insertInventory,
  updateAddInventory,
  updateInventory,
  deleteInventory,
};
