const dbQueries = require("./DB Queries/productsQueries");
const { body, validationResult } = require("express-validator");

const validateInput = [
  body("name").trim().isLength({ min: 2 }).withMessage("Length is too short."),
  body("price")
    .trim()
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a number greater than 0"),
  body("category")
    .trim()
    .optional({ checkFalsy: true })
    .custom((value, { req }) => {
      const categories = req.flash("product_category");
      const exist = categories.some((item) => item.id === Number(value));

      if (!exist) {
        throw new Error("Category does not exist in the list");
      }

      return true;
    }),
];

module.exports = {
  get: async (req, res) => {
    const content = req.params.content;
    const id = req.params.id;
    const productsData = await dbQueries.getAllProducts();
    let categories = [];

    if (content) {
      categories = await dbQueries.getAllCategories();
    }
    req.flash("product_category");
    req.flash("product_category", categories.length > 0 ? categories : null);

    let item = {};
    if (req.params.id) {
      item = await dbQueries.getSelectedProduct(req.params.id);
    }

    res.render("Products/Products.view.ejs", {
      active: "product",
      id,
      productsData,
      categories,
      content,
      item,
      oldInputs: req.flash("oldInputs")[0] || {},
      inputError: req.flash("inputErrors") || [],
      notification: req.flash("notification")[0] || {},
    });
  },
  postAdd: [
    validateInput,
    async (req, res) => {
      const validationError = validationResult(req);

      if (!validationError.isEmpty()) {
        req.flash("oldInputs", req.body);
        req.flash("inputErrors", validationError.array());

        return res.status(422).redirect("/products/form/");
      }

      await dbQueries.insertProduct(
        req.body.name,
        req.body.price,
        req.body.category,
      );
      req.flash("notification", {
        status: "success",
        message: "Product has been successfully added.",
      });
      res.status(204).redirect("/products");
    },
  ],
  postUpdate: [
    validateInput,
    async (req, res) => {
      const validationError = validationResult(req);

      if (!validationError.isEmpty()) {
        req.flash("oldInputs", req.body);
        req.flash("inputErrors", validationError.array());

        return res.status(422).redirect(`/products/form/${req.params.id}`);
      }

      await dbQueries.updateProduct(
        req.params.id,
        req.body.name,
        req.body.price,
        req.body.category,
      );
      req.flash("notification", {
        status: "success",
        message: "Product has been successfully updated.",
      });
      res.status(204).redirect("/products");
    },
  ],
  postDelete: async (req, res) => {
    await dbQueries.deleteProduct(req.params.id);
    req.flash("notification", {
      status: "success",
      message: "Product has been successfully deleted.",
    });
    res.status(204).redirect("/products");
  },
};
