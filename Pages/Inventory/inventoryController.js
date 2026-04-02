const dbQueries = require("./DB Queries/inventoryQueries");
const { body, validationResult } = require("express-validator");

const validateAllInput = [
  body("product")
    .trim()
    .notEmpty()
    .withMessage("Product is required")
    .custom((value, { req }) => {
      const productList = req.flash("product_list");
      const isExist = productList.some((row) => row.id == value);
      if (!isExist) {
        throw new Error(
          "The product you selected does not exist in db, please contact an admin.",
        );
      }

      return true;
    }),
  body("warehouse")
    .trim()
    .notEmpty()
    .withMessage("Warehouse is required")
    .custom((value, { req }) => {
      const warehouseList = req.flash("warehouse_list");
      const isExist = warehouseList.some((row) => row.id == value);
      if (!isExist) {
        throw new Error(
          "The warehouse you selected does not exist in db, please contact an admin.",
        );
      }

      return true;
    }),
  body("quantity")
    .trim()
    .notEmpty()
    .withMessage("Quantity is required.")
    .isInt()
    .withMessage("Quantity must be an integer."),
];

module.exports = {
  get: async (req, res) => {
    const content = req.params.content;
    const product_id = req.params.product_id;
    const warehouse_id = req.params.warehouse_id;
    const inventoryData = await dbQueries.getAllInventory();
    const products = await dbQueries.getAllProducts();
    const warehouses = await dbQueries.getAllWarehouse();

    req.flash("inventory_list");
    req.flash(
      "inventory_list",
      inventoryData.length > 0 ? inventoryData : null,
    );

    req.flash("product_list");
    req.flash("product_list", products.length > 0 ? products : null);

    req.flash("warehouse_list");
    req.flash("warehouse_list", warehouses.length > 0 ? warehouses : null);

    let item = {};
    if (product_id && warehouse_id) {
      item = await dbQueries.getSelectedInventory(product_id, warehouse_id);
    }

    res.render("Inventory/Inventory.view.ejs", {
      active: "inventory",
      inventoryData,
      product_id,
      warehouse_id,
      content,
      products,
      warehouses,
      oldInputs: req.flash("oldInputs")[0] || {},
      inputError: req.flash("inputError") || [],
      notification: req.flash("notification")[0] || {},
      item,
    });
  },
  postAdd: [
    validateAllInput,
    async (req, res) => {
      const product_id = req.body.product;
      const warehouse_id = req.body.warehouse;
      const quantity = req.body.quantity;

      const inventory_list = req.flash("inventory_list");
      const isExist = inventory_list.some(
        (row) =>
          row.product_id == product_id && row.warehouse_id == warehouse_id,
      );

      const validationError = validationResult(req);
      if (!validationError.isEmpty()) {
        req.flash("oldInputs", req.body);
        req.flash("inputError", validationError.array());
        return res.status(422).redirect("/inventory/form");
      }

      if (!isExist) {
        await dbQueries.insertInventory(product_id, warehouse_id, quantity);
        req.flash("notification", {
          status: "success",
          message: "Inventory has been successfully added.",
        });
      } else {
        await dbQueries.updateAddInventory(product_id, warehouse_id, quantity);
        req.flash("notification", {
          status: "success",
          message:
            "Quantity has successfully incremented to an existing inventory.",
        });
      }

      res.status(204).redirect("/inventory");
    },
  ],
  postUpdate: [
    validateAllInput,
    async (req, res) => {
      const product_id = req.body.product;
      const warehouse_id = req.body.warehouse;
      const quantity = req.body.quantity;

      const validationError = validationResult(req);
      if (!validationError.isEmpty()) {
        req.flash("oldInputs", req.body);
        req.flash("inputError", validationError.array());
        return res.status(422).redirect("/inventory/form");
      }

      await dbQueries.updateInventory(product_id, warehouse_id, quantity);
      req.flash("notification", {
        status: "success",
        message: "Inventory has been successfully updated.",
      });
      res.status(204).redirect("/inventory");
    },
  ],
  postDelete: async (req, res) => {
    const product_id = req.params.product_id;
    const warehouse_id = req.params.warehouse_id;
    await dbQueries.deleteInventory(product_id, warehouse_id);
    req.flash("notification", {
      status: "success",
      message: "Inventory has been successfully deleted.",
    });
    res.status(204).redirect("/inventory");
  },
};
