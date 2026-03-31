const pool = require("../../../models/pool");

const getAllInventory = async () => {
  const { rows } =
    await pool.query(`SELECT p.name product, w.name warehouse, w.location location, email, phone, quantity FROM inventory_application.inventory i 
JOIN inventory_application.products p ON product_id = p.id 
JOIN inventory_application.warehouse w ON warehouse_id = w.id
ORDER BY product_id ASC, warehouse_id ASC`);

  return rows;
};

module.exports = { getAllInventory };
