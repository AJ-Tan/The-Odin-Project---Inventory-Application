const { Client } = require("pg");

const SQL = `
TRUNCATE TABLE 
  inventory_application.inventory,
  inventory_application.products,
  inventory_application.categories,
  inventory_application.warehouse
RESTART IDENTITY CASCADE;

INSERT INTO inventory_application.categories (parent_id, name, level, status)
VALUES
-- Level 0 (no parent)
(NULL, 'Electronics', 0, 'active'),
(NULL, 'Clothing', 0, 'active'),
(NULL, 'Furniture', 0, 'active'),

-- Level 1 (child of Electronics)
(1, 'Mobile Phones', 1, 'active'),

-- Level 2 (child of Mobile Phones)
(4, 'Smartphones', 2, 'active');

INSERT INTO inventory_application.products (name, price, status, category_id)
VALUES
('iPhone 13', 45000, 'active',5),
('Samsung Galaxy S22', 42000, 'active',5),
('Wooden Table', 3500, 'active',3),
('T-Shirt Basic', 300, 'active',2),
('Office Chair', 2500, 'active',3),
('Sample phone', 123, 'active',4);

INSERT INTO inventory_application.warehouse (name, location, phone, email, status)
VALUES
('Main Warehouse', 'Manila City', '09171234567', 'mainwarehouse@email.com', 'active'),
('Secondary Warehouse', 'Pagadian City', '09987654321', 'secondarywarehouse@email.com', 'active');

INSERT INTO inventory_application.inventory (product_id, warehouse_id, quantity)
VALUES
(1, 1, 10),
(1, 2, 5),

(2, 1, 8),
(2, 2, 6),

(3, 1, 15),
(3, 2, 10),

(4, 1, 50),
(4, 2, 30),

(5, 1, 20),
(5, 2, 12);
`;

const resetData = async () => {
  const client = new Client({
    connectionString: process.env.DB_URL,
  });
  try {
    await client.connect();
    await client.query(SQL);
    await client.end();
  } catch (err) {
    return { isSuccess: false, msg: String(err) };
  }
  return { isSuccess: true, msg: "Success." };
};

module.exports = resetData;
