const pool = require("./pool");
const resetData = require("./resetData");

const getAllCategory = async () => {
  const { rows } = await pool.query(
    `SELECT c1.id id, c1.name name, c2.name main, c1.status FROM inventory_application.categories c1 LEFT JOIN inventory_application.categories c2 ON c1.parent_id = c2.id
    WHERE c1.status = 'active' ORDER BY c1.id ASC`,
  );
  return rows;
};

const getSelectedCategory = async (id) => {
  const { rows } = await pool.query(
    `SELECT * FROM inventory_application.categories WHERE id=$1`,
    [id],
  );
  return rows[0];
};

const insertCategory = async (name, parent_id) => {
  await pool.query(
    `INSERT INTO inventory_application.categories (name, parent_id, level) 
    VALUES ($1, $2,
    COALESCE((SELECT level+1 FROM inventory_application.categories c WHERE c.id=$2), 0)
    )`,
    [name, parent_id || null],
  );
};

const updateCategory = async (id, name, parent_id) => {
  await pool.query(
    `UPDATE inventory_application.categories SET name=$1, parent_id=$2, 
    level=COALESCE((SELECT level+1 FROM inventory_application.categories c WHERE c.id=$2), 0) 
    WHERE id=$3`,
    [name, parent_id || null, id],
  );
};

const deleteCategory = async (id) => {
  await pool.query(
    `UPDATE inventory_application.categories SET status='archived' WHERE id=$1`,
    [id],
  );
};

const getAllWarehouse = async () => {
  const { rows } = await pool.query(
    `SELECT * FROM inventory_application.warehouse WHERE status='active'`,
  );

  return rows;
};

const getSelectedWarehouse = async (id) => {
  const { rows } = await pool.query(
    `SELECT * FROM inventory_application.warehouse WHERE id=$1`,
    [id],
  );

  return rows[0];
};

const insertWarehouse = async (name, location) => {
  await pool.query(
    `INSERT INTO inventory_application.warehouse (name, location) VALUES ($1, $2)`,
    [name, location],
  );
};

const updateWarehouse = async (id, name, location) => {
  await pool.query(
    `UPDATE inventory_application.warehouse SET name=$2, location=$3 WHERE id=$1`,
    [id, name, location],
  );
};

const deleteWarehouse = async (id) => {
  await pool.query(`DELETE FROM inventory_application.warehouse WHERE id=$1`, [
    id,
  ]);
};

module.exports = {
  getAllCategory,
  getSelectedCategory,
  insertCategory,
  updateCategory,
  deleteCategory,
  getAllWarehouse,
  getSelectedWarehouse,
  insertWarehouse,
  updateWarehouse,
  deleteWarehouse,
  resetData,
};
