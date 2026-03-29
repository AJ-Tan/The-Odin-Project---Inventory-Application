const settingsQueries = require("../../models/settingsQueries");

module.exports = {
  get: async (req, res) => {
    const settingActive = req.params.settingActive
      ? req.params.settingActive
      : "category";
    let tblData = null;

    if (settingActive === "category") {
      tblData = await settingsQueries.getAllCategory();
    } else if (settingActive === "warehouse") {
      tblData = await settingsQueries.getAllWarehouse();
    }

    res.render("Settings/Settings.view.ejs", {
      active: "settings",
      settingActive,
      tblData,
    });
  },
};
