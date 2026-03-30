const settingsQueries = require("../../models/settingsQueries");

module.exports = {
  get: async (req, res) => {
    const settingsContent = req.query.content
      ? req.query.content
      : req.params.content
        ? req.params.content
        : "category";
    const params = req.params;

    let tblData = null;
    let item = { name: "", parent_id: null, location: "" };
    const itemId = req.params.id;

    if (settingsContent === "category") {
      tblData = await settingsQueries.getAllCategory();
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
    });
  },

  postAdd: (req, res) => {
    const content = req.params.content;

    switch (content) {
      case "category":
        settingsQueries.insertCategory(req.body.name, req.body.parent_id);
        res.status(204).redirect("/settings?content=category");
        break;
      case "warehouse":
        settingsQueries.insertWarehouse(req.body.name, req.body.location);
        res.status(204).redirect("/settings?content=warehouse");
        break;
      default:
        res.status(404).send("Invalid url.");
    }
  },

  postUpdate: (req, res) => {
    const content = req.params.content;

    switch (content) {
      case "category":
        settingsQueries.updateCategory(
          req.params.id,
          req.body.name,
          req.body.parent_id,
        );
        res.status(204).redirect("/settings?content=category");
        break;
      case "warehouse":
        settingsQueries.updateWarehouse(
          req.params.id,
          req.body.name,
          req.body.location,
        );
        res.status(204).redirect("/settings?content=warehouse");
        break;
      default:
        res.status(404).send("Invalid url.");
    }
  },

  postDelete: (req, res) => {
    const content = req.params.content;

    switch (content) {
      case "category":
        settingsQueries.deleteCategory(req.params.id);
        res.status(204).redirect("/settings?content=category");
        break;
      case "warehouse":
        settingsQueries.deleteWarehouse(req.params.id);
        res.status(204).redirect("/settings?content=warehouse");
        break;
      default:
        res.status(404).send("Invalid url.");
    }
  },

  postReset: (req, res) => {
    settingsQueries.resetData();
    res.status(204).redirect("/settings?content=misc&success=t");
  },
};
