const settingsQueries = require("../../models/settingsQueries");

module.exports = {
  get: async (req, res) => {
    const settingActive = req.params.settingActive
      ? req.params.settingActive
      : "category";
    const settingAction = req.params.settingAction;

    let tblData = null;
    let item = { name: "", parent_id: null, location: "" };

    const itemId = req.params.id;
    if (settingActive === "category") {
      tblData = await settingsQueries.getAllCategory();
      if (itemId) {
        item = await settingsQueries.getSelectedCategory(itemId);
      }
    } else if (settingActive === "warehouse") {
      tblData = await settingsQueries.getAllWarehouse();
      if (itemId) {
        item = await settingsQueries.getSelectedWarehouse(itemId);
      }
    }
    res.render("Settings/Settings.view.ejs", {
      active: "settings",
      settingActive,
      settingAction,
      tblData,
      item,
    });
  },

  postAdd: (req, res) => {
    const currentSetting = req.params.settingActive;

    switch (currentSetting) {
      case "category":
        settingsQueries.insertCategory(req.body.name, req.body.parent_id);
        res.status(200).redirect("/settings/category");
        break;
      case "warehouse":
        settingsQueries.insertWarehouse(req.body.name, req.body.location);
        res.status(200).redirect("/settings/warehouse");
        break;
      default:
        res.send("Invalid url.");
    }
  },

  postUpdate: (req, res) => {
    const currentSetting = req.params.settingActive;

    switch (currentSetting) {
      case "category":
        settingsQueries.updateCategory(
          req.params.id,
          req.body.name,
          req.body.parent_id,
        );
        res.status(200).redirect("/settings/category");
        break;
      case "warehouse":
        settingsQueries.updateWarehouse(
          req.params.id,
          req.body.name,
          req.body.location,
        );
        res.status(200).redirect("/settings/warehouse");
        break;
      default:
        res.send("Invalid url.");
    }
  },

  postDelete: (req, res) => {
    const currentSetting = req.params.settingActive;

    switch (currentSetting) {
      case "category":
        settingsQueries.deleteCategory(req.params.id);
        res.status(200).redirect("/settings/category");
        break;
      case "warehouse":
        settingsQueries.deleteWarehouse(req.params.id);
        res.status(200).redirect("/settings/warehouse");
        break;
      default:
        res.send("Invalid url.");
    }
  },
};
