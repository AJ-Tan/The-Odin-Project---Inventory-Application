const pool = require("../../../models/pool");

const getByWarehouse = async () => {
  const { rows } =
    await pool.query(`SELECT name, SUM(quantity) quantity FROM inventory_application.inventory 
  JOIN inventory_application.warehouse ON warehouse_id=id
  WHERE status='active'
  GROUP BY name
  ORDER BY quantity DESC LIMIT 5`);

  return rows;
};

const getByProduct = async () => {
  const { rows } =
    await pool.query(`SELECT name, SUM(quantity) quantity FROM inventory_application.inventory 
  JOIN inventory_application.products ON product_id=id
  WHERE status='active'
  GROUP BY name
  ORDER BY quantity DESC LIMIT 5`);

  return rows;
};

const getByCategory = async () => {
  const { rows } =
    await pool.query(`SELECT c.name, SUM(quantity) quantity FROM inventory_application.inventory i
    JOIN inventory_application.products p ON product_id=p.id
    JOIN inventory_application.categories c ON p.category_id=c.id
    WHERE p.status='active'
    GROUP BY c.name
    ORDER BY quantity DESC LIMIT 5
    `);

  return rows;
};

module.exports = {
  getByWarehouse,
  getByProduct,
  getByCategory,
};
