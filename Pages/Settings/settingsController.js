module.exports = {
  get: (req, res) => {
    const settingActive = req.params.settingActive
      ? req.params.settingActive
      : "category";
    res.render("Settings/Settings.view.ejs", {
      active: "settings",
      settingActive,
    });
  },
};
