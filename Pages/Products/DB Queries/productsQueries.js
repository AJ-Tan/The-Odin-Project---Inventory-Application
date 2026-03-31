const pool = require("../../../models/pool");

const getAllProducts = async () => {
  const { rows } = await pool.query(
    `SELECT * FROM inventory_application.products ORDER BY id ASC`,
  );

  return rows;
};

module.exports = {
  getAllProducts,
};
