const pool = require("../../../models/pool");

const getAllProducts = async () => {
  const { rows } = await pool.query(
    `WITH RECURSIVE product_chain AS (
    SELECT p.id as product_id,
    p.name as product_name, 
    p.price as product_price, 
    c.id as category_id, 
    c.name, c.parent_id,c.level
    FROM inventory_application.products p
    LEFT JOIN inventory_application.categories c ON p.category_id = c.id

    UNION ALL

    SELECT pc.product_id as product_id,
    pc.product_name as product_name, 
    pc.product_price as product_price, 
    c.id as category_id, 
    c.name, c.parent_id,c.level
    FROM product_chain pc
    JOIN inventory_application.categories c ON pc.parent_id = c.id
    )

    SELECT product_id, product_name, STRING_AGG(name, ', ' ORDER BY level DESC) categories, product_price FROM product_chain 
    GROUP BY product_id,product_name, product_price 
    ORDER BY product_id`,
  );

  return rows;
};

const getSelectedProduct = async (id) => {
  const { rows } = await pool.query(
    `SELECT * FROM inventory_application.products WHERE id=$1`,
    [id],
  );

  return rows[0];
};

const getAllCategories = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM inventory_application.categories",
  );
  return rows;
};

const insertProduct = async (name, price, category_id) => {
  await pool.query(
    `INSERT INTO inventory_application.products (name, price, category_id) VALUES ($1, $2, $3) RETURNING id`,
    [name, price, category_id || null],
  );
};

const updateProduct = async (id, name, price, category_id) => {
  await pool.query(
    `UPDATE inventory_application.products SET name=$2, price=$3, category_id=$4
    WHERE id=$1`,
    [id, name, price, category_id],
  );
};

module.exports = {
  getAllProducts,
  getSelectedProduct,
  getAllCategories,
  insertProduct,
  updateProduct,
};
