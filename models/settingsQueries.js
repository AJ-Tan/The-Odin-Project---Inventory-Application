const pool = require("./pool");

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
  console.log(id, name, parent_id);
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
    `SELECT * FROM inventory_application.warehouse`,
  );

  return rows;
};

const categorySearch = async (searchString) => {
  const { rows } = await pool.query(
    `select * from inventory_application.categories where name ilike concat('%', $1, '%')`,
    searchString,
  );

  return rows;
};

const warehouseSearch = async (searchString) => {
  const { rows } = await pool.query(
    `select * from inventory_application.warehouse where name ilike concat('%', $1, '%') or location ilike concat('%', $1, '%')`,
    searchString,
  );

  return rows;
};

module.exports = {
  getAllCategory,
  getSelectedCategory,
  insertCategory,
  updateCategory,
  deleteCategory,
  getAllWarehouse,
  categorySearch,
  warehouseSearch,
};
