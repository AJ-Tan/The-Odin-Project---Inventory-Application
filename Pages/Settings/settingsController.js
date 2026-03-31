const settingsQueries = require("./DB Queries/settingsQueries");
const { body, validationResult } = require("express-validator");

const validateInput = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("This field is required.")
    .isLength({ min: 2 })
    .withMessage("Name length is too short."),
  body("email")
    .trim()
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("Invalid email format.")
    .normalizeEmail(),
  body("phone")
    .trim()
    .optional({ checkFalsy: true })
    .matches(/^\+?[0-9\s\-]+$/)
    .withMessage("Phone must contain only numbers, spaces, +, and -")
    .isLength({ min: 7, max: 20 })
    .withMessage("Phone length must be between 7 and 20."),
  body("location")
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage("Location length is too short."),
];

module.exports = {
  get: async (req, res) => {
    const settingsContent = req.query.content
      ? req.query.content
      : req.params.content
        ? req.params.content
        : "category";
    const params = req.params;

    let tblData = null;
    let item = {};
    const itemId = req.params.id;

    if (settingsContent === "category") {
      tblData = await settingsQueries.getAllCategory(req.params.id);
      if (itemId) {
        item = await settingsQueries.getSelectedCategory(itemId);
      }
    } else if (settingsContent === "warehouse") {
      tblData = await settingsQueries.getAllWarehouse();
      if (itemId) {
        item = await settingsQueries.getSelectedWarehouse(itemId);
      }
    }

    res.render("Settings/Settings.view.ejs", {
      active: "settings",
      settingsContent,
      tblData,
      item,
      params,
      queries: req.query,
      inputError: req.flash("inputError"),
      oldInputs: req.flash("oldInputs")[0] || {},
    });
  },

  postAdd: [
    validateInput,
    async (req, res) => {
      const content = req.params.content;
      const inputError = validationResult(req);

      if (!inputError.isEmpty()) {
        req.flash("inputError", inputError.array());
        req.flash("oldInputs", req.body);

        return res.status(422).redirect(`/settings/${content}/`);
      }

      switch (content) {
        case "category":
          await settingsQueries.insertCategory(
            req.body.name,
            req.body.parent_id,
          );
          res.status(204).redirect("/settings?content=category");
          break;
        case "warehouse":
          await settingsQueries.insertWarehouse(
            req.body.name,
            req.body.email,
            req.body.phone,
            req.body.location,
          );
          res.status(204).redirect("/settings?content=warehouse");
          break;
        default:
          res.status(404).send("Invalid url.");
      }
    },
  ],

  postUpdate: [
    validateInput,
    async (req, res) => {
      const content = req.params.content;
      const inputError = validationResult(req);

      if (!inputError.isEmpty()) {
        req.flash("inputError", inputError.array());
        req.flash("oldInputs", req.body);

        return res
          .status(422)
          .redirect(`/settings/${content}/${req.params.id}`);
      }

      switch (content) {
        case "category":
          await settingsQueries.updateCategory(
            req.params.id,
            req.body.name,
            req.body.parent_id,
          );
          res.status(204).redirect("/settings?content=category");
          break;
        case "warehouse":
          await settingsQueries.updateWarehouse(
            req.params.id,
            req.body.name,
            req.body.email,
            req.body.phone,
            req.body.location,
          );
          res.status(204).redirect("/settings?content=warehouse");
          break;
        default:
          res.status(404).send("Invalid url.");
      }
    },
  ],

  postDelete: async (req, res) => {
    const content = req.params.content;

    switch (content) {
      case "category":
        await settingsQueries.deleteCategory(req.params.id);
        res.status(204).redirect("/settings?content=category");
        break;
      case "warehouse":
        await settingsQueries.deleteWarehouse(req.params.id);
        res.status(204).redirect("/settings?content=warehouse");
        break;
      default:
        res.status(404).send("Invalid url.");
    }
  },

  postReset: async (req, res) => {
    await settingsQueries.resetData();
    res.status(204).redirect("/settings?content=misc&success=t");
  },
};
