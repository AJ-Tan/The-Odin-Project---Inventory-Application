const pool = require("./pool");

const getAllCategory = async () => {
  const { rows } = await pool.query(
    `SELECT c1.id id, c1.name name, c2.name main, c1.status FROM inventory_application.categories c1 LEFT JOIN inventory_application.categories c2 ON c1.main_category_id = c2.id`,
  );
  return rows;
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
  getAllWarehouse,
  categorySearch,
  warehouseSearch,
};
