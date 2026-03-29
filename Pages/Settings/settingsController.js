const settingsQueries = require("../../models/settingsQueries");

module.exports = {
  get: async (req, res) => {
    const settingActive = req.params.settingActive
      ? req.params.settingActive
      : "category";
    const settingAction = req.params.settingAction;

    let tblData = null;
    let item = { name: "", parent_id: null };
    const itemId = req.params.id;
    if (settingActive === "category") {
      tblData = await settingsQueries.getAllCategory();
      if (itemId) {
        item = await settingsQueries.getSelectedCategory(itemId);
      }
    } else if (settingActive === "warehouse") {
      tblData = await settingsQueries.getAllWarehouse();
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
    settingsQueries.insertCategory(req.body.name, req.body.parent_id);
    res.status(200).redirect("/settings/category");
  },

  postUpdate: (req, res) => {
    settingsQueries.updateCategory(
      req.params.id,
      req.body.name,
      req.body.parent_id,
      req.body.status || "active",
    );
    res.status(200).redirect("/settings/category");
  },

  postDelete: (req, res) => {
    console.log("asd", req.params.id);
    settingsQueries.deleteCategory(req.params.id);
    res.status(200).redirect("/settings/category");
  },
};
